import * as React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { App, Title } from '../../OSX'

const StyledVSCode = styled.div``

const StyledApp = styled(App)`
  background: #011627;
`

export const VSCode = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "Workstation/VSCode/VSCode.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <StyledApp
      name="VS Code"
      icon={<Img fluid={data.file.childImageSharp.fluid} />}
    >
      <Title>src/index.html - VS Code</Title>
      <StyledVSCode>VS Code</StyledVSCode>
    </StyledApp>
  )
}
