let touchEvent = false
if (typeof window !== 'undefined') {
  let timer
  const callback = () => {
    touchEvent = true
    clearTimeout(timer)
    timer = setTimeout(() => (touchEvent = false))
  }

  window.addEventListener('touchstart', callback)
  window.addEventListener('touchend', callback)
}

export const isTouchEvent = () => touchEvent
