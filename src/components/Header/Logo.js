import * as React from 'react'
import styled from '@emotion/styled'
import { animatedGradientText } from '../../utils'
import { Link, useStaticQuery, graphql } from 'gatsby'

const StyledLogo = styled(Link)`
  text-decoration: none;
  align-items: center;
  display: flex;
  cursor: pointer;
  flex-shrink: 0;
  /* filter: drop-shadow(0 0 13px rgba(255, 255, 255, 0.4));
transition: filter 0.3s ease; */
  /*
&:hover {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
} */
`

const Icon = styled.img`
  height: 65px;
`

const Text = styled.h1`
  ${animatedGradientText({
    colors: [
      'rgb(221, 209, 230)',
      'rgb(221, 209, 230)',
      'rgb(221, 209, 230)',
      'rgb(221, 209, 230)',
      'rgba(255, 255, 255, 1)',
      'rgb(221, 209, 230)',
      'rgb(221, 209, 230)',
      'rgb(221, 209, 230)',
      'rgb(221, 209, 230)',
    ],
    duration: 15 * 1000,
    gradientSize: 2,
  })}
  font-size: 1.9rem;
  color: rgb(221, 209, 230);
  margin: 0 14px;

  @media (max-width: 460px) {
    margin: 0 16px;
    font-size: 1.7rem;
  }
`

export const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <StyledLogo to="/">
      <Icon src="https://cdn.samdd.me/samdd-logo/variations/400circle_alt.png" />
      <Text>{data.site.siteMetadata.title}</Text>
    </StyledLogo>
  )
}
