import { useEffect } from 'react'
import { isTouchEvent } from '../../../utils'

export const useMouse = (laptopRef, { onMove, onEnter, onLeave }) => {
  useEffect(() => {
    let isEntered = false

    const callback = ({ clientX, clientY, target }) => {
      if (isTouchEvent()) return

      const entered = target && laptopRef.current.contains(target)

      if (entered !== isEntered) {
        entered ? onEnter() : onLeave()
        isEntered = entered
      }

      if (!entered) return

      const rect = laptopRef.current.getBoundingClientRect()

      const centerY = rect.y + rect.height / 2
      const centerX = rect.x + rect.width / 2

      const amountX = (clientX - centerX) * window.devicePixelRatio
      const amountY = -((clientY - centerY) * window.devicePixelRatio)

      onMove(-10 + amountY * 0.04, amountX * 0.03)
    }
    window.addEventListener('mousemove', callback)
    return () => window.removeEventListener('mousemove', callback)
  }, [])
}
