import { useMemo, useEffect, useRef } from 'react'
import { useForceUpdate } from './useForceUpdate'

export const useResizeObserver = elementRef => {
  const accessedProperties = useMemo(() => new Set(), [])
  const contentRectRef = useRef(null)
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new ResizeObserver(() => {
      const contentRect = element.getBoundingClientRect()
      const prevContentRect = contentRectRef.current
      contentRectRef.current = contentRect

      if (
        // If we haven't given the contentRect yet
        !prevContentRect ||
        // Or an accessed property has changed between rects
        Array.from(accessedProperties).find(
          prop => contentRect[prop] !== prevContentRect[prop]
        )
      ) {
        forceUpdate()
      }
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [elementRef.current])

  // Only force update the component when accessed properties on the rect
  // change (instead of each time any property changes)
  return useMemo(() => {
    return new Proxy(contentRectRef.current || {}, {
      get(target, prop) {
        accessedProperties.add(prop)
        const rect = contentRectRef.current
        return rect && prop in rect ? rect[prop] : null
      },
    })
  }, [contentRectRef.current])
}
