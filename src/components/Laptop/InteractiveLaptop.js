import * as React from 'react'
import { Laptop } from './Laptop'
import { useSpring } from 'framer-motion'

export const InteractiveLaptop = ({ x, y, z, ...props }) => {
  const rotateX = useSpring(x)
  const rotateY = useSpring(y)
  const scale = useSpring(1)

  return (
    <Laptop
      onMouseMove={({ clientX: x, clientY: y }) => {
        rotateX.set(-(y - window.innerHeight / 2) / 30 - 10)
        rotateY.set((x - window.innerWidth / 2) / 80)
      }}
      onMouseEnter={() => {
        scale.set(1.1)
      }}
      onMouseLeave={() => {
        rotateX.set(x)
        rotateY.set(y)
        scale.set(1)
      }}
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
