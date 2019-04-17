import React from 'react'
import Img from 'gatsby-image'
import { Layout, SEO, Banner } from '../'
import styled from '@emotion/styled'
import { animatedGradient } from '../../utils'
import Moment from 'react-moment'
import { usePauseBackgroundEffect } from '../../hooks'
import { Mdx } from './Mdx'
import { TimeRange } from '../TimeRange'

const StyledLayout = styled(Layout)`
  background-color: rgba(255, 255, 255, 0.95);
  color: #0a0014;
  font-size: 1.15rem;
`

const Article = styled('article')`
  width: 100%;
  max-width: 1035px;
  align-self: center;
`

const Title = styled.h1`
  margin: 0;
  margin-bottom: 20px;
  font-size: 4rem;
  text-align: center;
`

const Period = styled.h3`
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
  opacity: 0.7;
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

export const MdxLayout = ({ data }) => {
  usePauseBackgroundEffect()

  const {
    excerpt,
    start_date,
    end_date,
    title,
    image,
    gradient,
  } = data.mdx.frontmatter

  return (
    <StyledLayout
      banner={
        <Banner
          amount={image ? 0.4 : 0.8}
          content={
            image ? (
              image.childImageSharp ? (
                <Img
                  alt={title}
                  fluid={{ ...image.childImageSharp.fluid, sizes: '100vw' }}
                />
              ) : (
                <img alt={title} src={image.publicURL} />
              )
            ) : (
              <GradientBackground colors={gradient} />
            )
          }
        >
          <Title>{title}</Title>
          <Period>
            <TimeRange from={start_date} to={end_date} format="MMM DD, YYYY" />
          </Period>
        </Banner>
      }
    >
      <SEO
        title={title}
        image={
          image
            ? `${data.site.siteMetadata.siteUrl}${image.publicURL}`
            : undefined
        }
        description={excerpt}
      />
      <Article>
        <Mdx>{data.mdx.code.body}</Mdx>
      </Article>
    </StyledLayout>
  )
}
