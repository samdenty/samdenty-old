import * as React from 'react'
import { Laptop } from './Laptop'
import { useSpring } from 'framer-motion'
import { useEffect } from 'react'

const TOUCH = typeof window !== 'undefined' && 'ontouchstart' in window

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
      {...(TOUCH
        ? undefined
        : {
            onMouseMove: ({ clientX: x, clientY: y }) => {
              rotateX.set(-(y - window.innerHeight / 2) / 30 - 10)
              rotateY.set((x - window.innerWidth / 2) / 80)
            },
            onMouseEnter: () => {
              scale.set(1.1)
            },
            onMouseLeave: () => {
              rotateX.set(x)
              rotateY.set(y)
              scale.set(1)
            },
          })}
      style={{
        rotateX,
        rotateY,
        rotateZ: z,
        scale,
      }}
      {...props}
    />
  )
}
