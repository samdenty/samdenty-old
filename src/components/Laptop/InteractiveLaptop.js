import * as React from 'react'
import { Laptop } from './Laptop'
import { animated, useSpring } from 'react-spring'

const AnimatedLaptop = animated(Laptop)

export const InteractiveLaptop = ({ x, y, z, ...props }) => {
  const [{ xys }, set] = useSpring(() => ({
    xys: [x, y, 1],
    config: { mass: 4, tension: 350, friction: 40 },
  }))

  return (
    <AnimatedLaptop
      onMouseMove={({ clientX: x, clientY: y }) =>
        set({
          xys: [
            -(y - window.innerHeight / 2) / 30 - 10,
            (x - window.innerWidth / 2) / 80,
            1.1,
          ],
        })
      }
      onMouseLeave={() => set({ xys: [x, y, 1] })}
      style={{
        willChange: 'transform',
        transform: xys.interpolate(
          (x, y, s) =>
            `scale(${s}) rotateX(${x}deg) rotateY(${y}deg)
        rotateZ(${z}deg)`
        ),
      }}
      {...props}
    />
  )
}
