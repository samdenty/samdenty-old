import * as React from 'react'
import { Laptop } from '../Laptop'
import { useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { isTouchEvent } from '../../../utils'
import { useAccelerometer } from './useAccelerometer'
import { useMouse } from './useMouse'

const spring = {
  stiffness: 110,
  damping: 15,
}

export const InteractiveLaptop = ({ x, y, z, ...props }) => {
  const laptopRef = useRef()
  const rotateX = useSpring(x, spring)
  const rotateY = useSpring(y, spring)
  const scale = useSpring(1)

  useAccelerometer((x, y) => {
    rotateX.set(x)
    rotateY.set(y)
  })

  useMouse(laptopRef, {
    onMove(x, y) {
      rotateX.set(x)
      rotateY.set(y)
    },
    onEnter() {
      scale.set(1.1)
    },
    onLeave() {
      rotateX.set(x)
      rotateY.set(y)
      scale.set(1)
    },
  })

  useEffect(() => rotateX.set(x), [x])
  useEffect(() => rotateY.set(y), [y])

  return (
    <Laptop
      ref={laptopRef}
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
