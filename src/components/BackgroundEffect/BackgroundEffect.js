import * as React from 'react'
import { styled } from 'linaria/react'
import { createBackgroundEffect } from './createBackgroundEffect'

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
  const canvas = React.useRef(null)

  const effectRef = React.useRef(null)

  React.useEffect(() => {
    const effect = createBackgroundEffect(canvas.current)
    effectRef.current = effect
    effect.draw()
    setLoaded(true)
    return () => effect.stop()
  }, [canvas.current])

  React.useEffect(() => {
    effectRef.current.stop()

    if (paused) {
      effectRef.current.stop()
    } else {
      effectRef.current.start()
    }
  }, [effectRef.current, paused])

  return <StyledCanvas loaded={loaded} ref={canvas} />
}

export const BackgroundEffectProvider = ({ children }) => {
  const [paused, setPaused] = React.useState(false)

  return (
    <BackgroundEffectContext.Provider value={[paused, setPaused]}>
      {children}
    </BackgroundEffectContext.Provider>
  )
}
