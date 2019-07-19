import * as React from 'react'
import { useState, useMemo } from 'react'
import { BootScreen } from './BootScreen/BootScreen'
import { styled } from 'linaria/react'
import { Desktop } from './Desktop'
import { App, AppsContext } from './App'
import { observable } from 'mobx'
import { AnimatePresence } from 'framer-motion'

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
    src: url(${require('../../assets/fonts/sf-pro-text_light.woff')});
  }

  @font-face {
    font-family: 'SF Pro Text';
    font-weight: 400;
    src: url(${require('../../assets/fonts/sf-pro-text_regular.woff2')});
  }

  @font-face {
    font-family: 'SF Pro Text';
    font-weight: 600;
    src: url(${require('../../assets/fonts/sf-pro-text_semibold.woff2')});
  }

  @font-face {
    font-family: 'SF Pro Text';
    font-weight: 700;
    src: url(${require('../../assets/fonts/sf-pro-text_bold.woff2')});
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
        <AnimatePresence>
          {booting && (
            <BootScreen
              duration={boot}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        {!booting && (
          <Desktop
            style={{ width: '100%', height: '100%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {children}
          </Desktop>
        )}
      </StyledOSX>
    </AppsContext.Provider>
  )
}
