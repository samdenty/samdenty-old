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

      const amountX = (clientX - centerX) / rect.width
      const amountY = -((clientY - centerY) / rect.height)

      onMove(-10 + amountY * 10, amountX * 7)
    }
    window.addEventListener('mousemove', callback)
    return () => window.removeEventListener('mousemove', callback)
  }, [])
}
