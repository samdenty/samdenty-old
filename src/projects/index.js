import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'
import { Layout, SEO } from '../components'
import styled from '@emotion/styled'

const Title = styled.h1``

export default ({ data }) => {
  return (
    <Layout>
      <SEO
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        keywords={[`gatsby`, `application`, `react`]}
      />

      <Title>{data.mdx.frontmatter.title}</Title>

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
      excerpt
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`
