import React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'
import { Layout, SEO, Banner } from '../components'
import styled from '@emotion/styled'
import { animatedGradient } from '../utils'
import { usePauseBackgroundEffect } from '../hooks'

const StyledLayout = styled(Layout)`
  background-color: rgba(255, 255, 255, 0.95);
  color: #0a0014;
`

const Title = styled.h1`
  font-size: 4rem;
  text-align: center;
`

const GradientBackground = styled.div`
  ${({ colors }) =>
    animatedGradient({
      colors: colors || undefined,
      gradientSize: 1.1,
      duration: 20 * 1000,
    })};

  height: 200%;
  width: 100%;
`

export default ({ data }) => {
  usePauseBackgroundEffect()
  const { image, gradient } = data.mdx.frontmatter

  return (
    <StyledLayout
      banner={
        <Banner
          amount={image ? 0.4 : 0.8}
          content={
            image ? (
              image.childImageSharp ? (
                <Img
                  fluid={{ ...image.childImageSharp.fluid, sizes: '100vw' }}
                />
              ) : (
                <img src={image.publicURL} />
              )
            ) : (
              <GradientBackground colors={gradient} />
            )
          }
        >
          <Title>{data.mdx.frontmatter.title}</Title>
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
    </StyledLayout>
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
