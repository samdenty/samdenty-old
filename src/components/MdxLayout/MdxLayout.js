import React from 'react'
import { Layout, SEO } from '../'
import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import { ParallaxBanner } from './ParallaxBanner'
import { Mdx } from './Mdx'
import { TimeRange } from '../TimeRange'
import GatsbyImage from 'gatsby-image'

const StyledLayout = styled2(Layout)`
  background-color: #fff;
  color: #0a0014;
  font-size: 1.15rem;
  width: 100%;
  max-width: 1175px;
  margin-top: -100px;
  align-self: center;

  @media (min-width: 1175px) {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    border-radius: 10px;
  }
`

const Header = styled.div`
  display: flex;
  line-height: 64px;
  margin-bottom: 25px;
`

const Title = styled.h1`
  margin: 0;
  font-size: 4rem;
  text-align: center;
`

const Period = styled.h3`
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
  opacity: 0.7;
`

const LogoImg = styled.img`
  height: 64px;
  margin-right: 25px;
`

export const MdxLayout = ({ data }) => {
  const {
    logo,
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
        <ParallaxBanner
          amount={image ? 0.4 : 0.8}
          gradient={gradient}
          background={
            image ? (
              image.childImageSharp ? (
                <GatsbyImage
                  alt={title}
                  fluid={{ ...image.childImageSharp.fluid, sizes: '100vw' }}
                />
              ) : (
                <img alt={title} src={image.publicURL} />
              )
            ) : null
          }
        >
          <Header>
            {logo &&
              (logo.childImageSharp ? (
                <Logo as={GatsbyImage} fluid={logo.childImageSharp.fluid} />
              ) : (
                <LogoImg src={logo.publicURL} />
              ))}
            <Title>{title}</Title>
          </Header>

          <Period>
            <TimeRange from={start_date} to={end_date} format="MMM DD, YYYY" />
          </Period>
        </ParallaxBanner>
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

      <Mdx>{data.mdx.body}</Mdx>
    </StyledLayout>
  )
}
