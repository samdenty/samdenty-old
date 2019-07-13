import 'prismjs/themes/prism-tomorrow.css'
import mediumZoom from 'medium-zoom'

import { ParallaxProvider } from 'react-scroll-parallax'
import * as React from 'react'
import { BackgroundEffect, BackgroundEffectProvider } from './src/components'

export const wrapRootElement = ({ element }) => {
  return (
    <ParallaxProvider>
      <BackgroundEffectProvider>
        <BackgroundEffect />
        {element}
      </BackgroundEffectProvider>
    </ParallaxProvider>
  )
}

export const onRouteUpdate = (_, pluginOptions) => {
  mediumZoom('.gatsby-resp-image-image', {
    margin: 20,
  })
}
