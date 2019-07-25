import { useEffect } from 'react'

export const useAccelerometer = onChange => {
  useEffect(() => {
    if (!window.DeviceOrientationEvent) return

    let initialOrientation
    const callback = orientation => {
      if (orientation.beta === null || orientation.gamma === null) return

      if (!initialOrientation) initialOrientation = orientation

      const beta = initialOrientation.beta - orientation.beta
      const gamma = initialOrientation.gamma - orientation.gamma

      onChange(beta * 0.2 - 15, -gamma * 0.1)
    }

    window.addEventListener('deviceorientation', callback)
    return () => window.removeEventListener('deviceorientation', callback)
  }, [])
}
