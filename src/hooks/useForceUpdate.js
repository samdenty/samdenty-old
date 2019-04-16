import { useReducer, useMemo } from 'react'
const reducer = state => !state

export const useForceUpdate = () => {
  const [, dispatch] = useReducer(reducer, true)

  const memoizedDispatch = useMemo(
    () => () => {
      dispatch(null)
    },
    [dispatch]
  )
  return memoizedDispatch
}
