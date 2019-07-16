import { useState, useMemo, useRef } from 'react'

export const useSearch = value => {
  const ref = useRef()
  const [focus, setFocus] = useState(false)
  const [query, setQuery] = useState(value)

  const listeners = useMemo(() => new Set(), [])

  const search = {
    ref,
    query,
    focus,
    visible: !!(focus && query.length),
    setFocus,
    setQuery(value) {
      listeners.forEach(propagate => propagate(value))
      setQuery(value)
    },
    onQuery(listener) {
      listeners.add(listener)
    },

    inputProps: {
      value: query,
      onChange: ({ target }) => search.setQuery(target.value),
      onFocus: () => setFocus(true),
      onClick: () => setFocus(true),
      focus,
    },
  }
  return search
}
