import * as React from 'react'
import { useState, useMemo } from 'react'
import { BootScreen } from './BootScreen/BootScreen'
import { useTransition, animated } from 'react-spring'
import styled from '@emotion/styled'
import { Desktop } from './Desktop'
import { App, AppContext } from './App'
import { observable } from 'mobx'

const AnimatedDesktop = animated(Desktop)
const AnimatedBootScreen = animated(BootScreen)

const StyledOSX = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
`

export const OSX = ({ boot = 800, children }) => {
  const appContext = useMemo(() => observable.map(), [])
  const [booting, setBooting] = useState(boot ? true : false)

  const transitions = useTransition(booting, null, {
    from: { position: 'absolute', width: '100%', height: '100%', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  React.useEffect(() => {
    if (!boot) return

    let timer = setTimeout(
      () => setBooting(false),
      boot + Math.min(700, boot * 0.3)
    )
    return () => clearTimeout(timer)
  }, [boot])

  return (
    <AppContext.Provider value={appContext}>
      <StyledOSX>
        {transitions.map(({ item, key, props }) =>
          item ? (
            <AnimatedBootScreen key={key} duration={boot} style={props} />
          ) : (
            <AnimatedDesktop key={key} style={props}>
              {children}
            </AnimatedDesktop>
          )
        )}
      </StyledOSX>
    </AppContext.Provider>
  )
}
