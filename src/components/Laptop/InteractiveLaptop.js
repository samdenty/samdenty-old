import * as React from 'react'
import { Laptop } from './Laptop'
import { useSpring } from 'framer-motion'
import { useEffect } from 'react'

const isTouch = () => typeof window !== 'undefined' && 'ontouchstart' in window

export const InteractiveLaptop = ({ x, y, z, ...props }) => {
  const rotateX = useSpring(x)
  const rotateY = useSpring(y)
  const scale = useSpring(1)

  useEffect(() => {
    if (!window.DeviceOrientationEvent) return

    let initialOrientation
    const callback = orientation => {
      if (orientation.beta === null || orientation.gamma === null) return

      if (!initialOrientation) initialOrientation = orientation

      const beta = initialOrientation.beta - orientation.beta
      const gamma = initialOrientation.gamma - orientation.gamma

      rotateX.set(beta * 0.2 - 15)
      rotateY.set(-gamma * 0.1)
    }

    window.addEventListener('deviceorientation', callback)
    return () => window.removeEventListener('deviceorientation', callback)
  }, [])

  return (
    <Laptop
      onMouseMove={({ clientX: x, clientY: y }) => {
        if (isTouch()) return

        rotateX.set(-(y - window.innerHeight / 2) / 30 - 10)
        rotateY.set((x - window.innerWidth / 2) / 80)
      }}
      onMouseEnter={e => {
        if (isTouch()) return

        scale.set(1.1)
      }}
      onMouseLeave={() => {
        if (isTouch()) return

        rotateX.set(x)
        rotateY.set(y)
        scale.set(1)
      }}
      {...props}
      style={{
        rotateX,
        rotateY,
        rotateZ: z,
        scale,
        ...props.style,
      }}
    />
  )
}
