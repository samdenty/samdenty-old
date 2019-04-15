import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'
import { Layout, SEO } from '../components'

export default ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <SEO
          title={data.mdx.frontmatter.title}
          keywords={[`gatsby`, `application`, `react`]}
        />
      </Helmet>
      <MDXProvider
        components={{
          wrapper: ({ children }) => (
            <React.Fragment>{children}</React.Fragment>
          ),
        }}
      >
        <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query MDXRuntimeQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`
