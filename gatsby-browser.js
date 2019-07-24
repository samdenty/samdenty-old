import 'prismjs/themes/prism-tomorrow.css'
import mediumZoom from 'medium-zoom'

import { ParallaxProvider } from 'react-scroll-parallax'
import * as React from 'react'
import { BackgroundEffect, BackgroundEffectProvider } from './src/components'
import { ThemeProvider, useTheme } from './src/theme'
import { ThemeContext } from '@emotion/core'

const EmotionThemeProvider = ({ children }) => {
  const theme = useTheme()
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <EmotionThemeProvider>
        <ParallaxProvider>
          <BackgroundEffectProvider>
            <BackgroundEffect />
            {element}
          </BackgroundEffectProvider>
        </ParallaxProvider>
      </EmotionThemeProvider>
    </ThemeProvider>
  )
}

export const onRouteUpdate = (_, pluginOptions) => {
  mediumZoom('.gatsby-resp-image-image', {
    margin: 20,
  })
}
