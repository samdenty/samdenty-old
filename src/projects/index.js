import React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'
import { Parallax, Background } from 'react-parallax'
import { Layout, SEO } from '../components'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { animatedGradient } from '../utils'

const Banner = styled(Parallax)`
  height: 500px;
  flex-shrink: 0;

  .react-parallax-background,
  .react-parallax-background-children {
    height: 100%;
    width: 100%;
  }
`

const Title = styled.h1``

const GradientBackground = styled.div`
  ${({ colors }) =>
    animatedGradient({
      colors: colors || undefined,
      gradientSize: 1.1,
      duration: 20 * 1000,
    })};

  height: 100%;
  width: 100%;
`

export default ({ data }) => {
  const { image, gradient } = data.mdx.frontmatter

  return (
    <Layout
      banner={
        <Banner strength={300}>
          <Title>{data.mdx.frontmatter.title}</Title>
          <Background>
            {image ? (
              <Img fluid={{ ...image.childImageSharp.fluid, sizes: '100vw' }} />
            ) : (
              <GradientBackground colors={gradient} />
            )}
          </Background>
        </Banner>
      }
    >
      <SEO
        title={data.mdx.frontmatter.title}
        image={
          image
            ? `${data.site.siteMetadata.siteUrl}${image.publicURL}`
            : undefined
        }
        description={data.mdx.excerpt}
        keywords={[`gatsby`, `application`, `react`]}
      />

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
    site {
      siteMetadata {
        siteUrl
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt
      frontmatter {
        title
        gradient
        image {
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      code {
        body
      }
    }
  }
`
