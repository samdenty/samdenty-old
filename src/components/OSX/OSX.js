import * as React from 'react'
import { useState, useMemo } from 'react'
import { BootScreen } from './BootScreen/BootScreen'
import { useTransition, animated } from 'react-spring'
import { styled } from 'linaria/react'
import { Desktop } from './Desktop'
import { App, AppsContext } from './App'
import { observable } from 'mobx'

const AnimatedDesktop = animated(Desktop)
const AnimatedBootScreen = animated(BootScreen)

const StyledOSX = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;

  font-family: 'SF Pro Text', 'Myriad Set Pro', 'SF Pro Icons', 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;

  @font-face {
    font-family: 'SF Pro Text';
    font-weight: 300;
    src: url('https://www.apple.com/wss/fonts/SF-Pro-Text/v2/sf-pro-text_light.woff2');
  }

  @font-face {
    font-family: 'SF Pro Text';
    font-weight: 400;
    src: url('https://www.apple.com/wss/fonts/SF-Pro-Text/v2/sf-pro-text_regular.woff2');
  }

  @font-face {
    font-family: 'SF Pro Text';
    font-weight: 600;
    src: url('https://www.apple.com/wss/fonts/SF-Pro-Text/v2/sf-pro-text_semibold.woff2');
  }

  @font-face {
    font-family: 'SF Pro Text';
    font-weight: 700;
    src: url('https://www.apple.com/wss/fonts/SF-Pro-Text/v2/sf-pro-text_bold.woff2');
  }
`

export const OSX = ({ boot = 800, children }) => {
  const appContext = useMemo(
    () =>
      observable.object({
        apps: observable.map(),
        get focusedApp() {
          return Array.from(this.apps.values()).find(app => app.focused)
        },
      }),
    []
  )
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
    <AppsContext.Provider value={appContext}>
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
    </AppsContext.Provider>
  )
}
