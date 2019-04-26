import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Laptop } from './Laptop'

export const InteractiveLaptop = ({ x, y, z, ...props }) => {
  const laptopRef = useRef()
  const [currentX, setCurrentX] = useState(x)
  const [currentY, setCurrentY] = useState(y)

  useEffect(() => {
    const callback = ({ clientX, clientY }) => {
      const rect = laptopRef.current.getBoundingClientRect()

      const centerX = rect.x + rect.width / 2
      const centerY = rect.y + rect.height / 2

      const percentX =
        clientX < centerX
          ? -((centerX - clientX) / centerX)
          : (clientX - centerX) / (window.innerWidth - centerX)

      const percentY =
        clientY > centerY
          ? -((clientY - centerY) / (window.innerHeight - centerY))
          : (centerY - clientY) / centerY

      setCurrentX(x + percentX * 2)
      setCurrentY(y + percentY * 1)
    }
    window.addEventListener('mousemove', callback)
    return () => window.removeEventListener('mousemove', callback)
  }, [x, y])

  return (
    <Laptop
      ref={laptopRef}
      style={{
        willChange: 'transform',
        transform: `rotateX(${currentY}deg) rotateY(${currentX}deg)
    rotateZ(${z}deg)`,
      }}
      {...props}
    />
  )
}
