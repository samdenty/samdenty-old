import 'prismjs/themes/prism-tomorrow.css'
import { ParallaxProvider } from 'react-scroll-parallax'
import * as React from 'react'
import { BackgroundEffect } from './src/components'

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <BackgroundEffect />
      {element}
    </>
  )
}
