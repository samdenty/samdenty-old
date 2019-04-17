import * as React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'
import * as components from './components'

export const Mdx = ({ children }) => {
  return (
    <MDXProvider components={components}>
      <MDXRenderer>{children}</MDXRenderer>
    </MDXProvider>
  )
}
