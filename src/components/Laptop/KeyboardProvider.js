import * as React from 'react'
import { createContext, useMemo } from 'react'

export const KeyboardContext = createContext(null)

export const useKeyboard = () => {
  return useMemo(() => {
    const callbacks = new Set()

    return {
      onPressKey(callback) {
        callbacks.add(callback)
        return () => callbacks.delete(callback)
      },
      pressKey(...args) {
        callbacks.forEach(c => c(...args))
      },
    }
  }, [])
}

export const KeyboardProvider = ({ keyboard = useKeyboard(), children }) => {
  return (
    <KeyboardContext.Provider value={keyboard}>
      {children}
    </KeyboardContext.Provider>
  )
}
