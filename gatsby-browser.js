import 'prismjs/themes/prism-tomorrow.css'
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
