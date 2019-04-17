import { useEffect, useContext, useMemo } from 'react'
import { BackgroundEffectContext } from '../components'

export const usePauseBackgroundEffect = (paused = true) => {
  const [isPaused, setPaused] = useContext(BackgroundEffectContext)
  const initiallyWasPaused = useMemo(() => isPaused, [])

  useEffect(() => {
    setPaused(paused)
  }, [paused])

  useEffect(
    () => () => {
      setPaused(initiallyWasPaused)
    },
    []
  )
}
