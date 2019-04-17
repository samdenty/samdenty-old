import { createPortal } from 'react-dom'
import { useMemo, useLayoutEffect } from 'react'

let portalRoot = null
const browser = typeof document !== 'undefined'
if (browser) {
  portalRoot = document.createElement('div')
  document.body.append(portalRoot)
}

export const Portal = ({ children, container = portalRoot }) => {
  if (!browser) return children

  const element = useMemo(() => document.createElement('div'), [])

  useLayoutEffect(() => {
    container.appendChild(element)
    return () => container.removeChild(element)
  }, [])

  return createPortal(children, element)
}
