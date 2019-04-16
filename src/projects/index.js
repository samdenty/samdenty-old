import React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'
import { ParallaxBanner } from 'react-scroll-parallax'
import { Layout, SEO } from '../components'
import styled from '@emotion/styled'
import { animatedGradient } from '../utils'

const Banner = styled(ParallaxBanner)`
  height: 70vh;
  overflow: hidden;
  min-height: 500px;
  max-height: 640px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  .parallax-outer {
    z-index: -1;
  }

  .gatsby-image-wrapper {
    height: 100%;
    width: 100%;
  }
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
  const { image, gradient } = data.mdx.frontmatter

  return (
    <Layout
      banner={
        <Banner
          layers={[
            {
              amount: image ? 0.4 : 0.8,
              image: image && !image.childImageSharp ? image.publicURL : null,
              children: image ? (
                image.childImageSharp ? (
                  <Img
                    fluid={{ ...image.childImageSharp.fluid, sizes: '100vw' }}
                  />
                ) : (
                  undefined
                )
              ) : (
                <GradientBackground colors={gradient} />
              ),
            },
          ]}
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
