import * as React from 'react'
import { styled } from 'linaria/react'
import debounce from 'debounce'
import * as Comlink from 'comlink'

export const StyledCanvas = styled.canvas`
  position: fixed;
  z-index: -1;
  transition: opacity 2s ease, transform 4s ease;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transform: ${({ loaded }) => (loaded ? 'none' : 'scale(0.7)')};
`

export const BackgroundEffectContext = React.createContext([false, () => {}])

export const BackgroundEffect = () => {
  const [paused] = React.useContext(BackgroundEffectContext)
  const [loaded, setLoaded] = React.useState(false)
  const canvasRef = React.useRef(null)

  const EffectRenderer = React.useMemo(
    () =>
      typeof window !== 'undefined' &&
      Comlink.wrap(new Worker('./EffectRenderer.js', { type: 'module' }))
  )

  const effectRef = React.useRef(null)

  React.useEffect(() => {
    const createEffect = async () => {
      const offscreen = canvasRef.current.transferControlToOffscreen()
      const effect = await new EffectRenderer(
        Comlink.transfer(offscreen, [offscreen])
      )

      effectRef.current = effect

      const calculate = async () => {
        const width = window.innerWidth
        const height = window.innerHeight

        await effect.calculate(width, height, devicePixelRatio)
        canvasRef.current.style.width = `${width}px`
        canvasRef.current.style.height = `${height}px`
      }

      await calculate()
      effect.draw().then(() => setLoaded(true))

      const callback = debounce(calculate, 200)
      window.addEventListener('resize', callback)

      return () => {
        effect.stop()
        window.removeEventListener('resize', callback)
      }
    }

    const dispose = createEffect()

    return () => dispose.then(dispose => dispose())
  }, [])

  React.useEffect(() => {
    if (!loaded) return
    effectRef.current.stop()

    if (paused) {
      effectRef.current.stop()
    } else {
      effectRef.current.start()
    }
  }, [effectRef.current, loaded, paused])

  return <StyledCanvas loaded={loaded} ref={canvasRef} />
}

export const BackgroundEffectProvider = ({ children }) => {
  const [paused, setPaused] = React.useState(false)

  return (
    <BackgroundEffectContext.Provider value={[paused, setPaused]}>
      {children}
    </BackgroundEffectContext.Provider>
  )
}
