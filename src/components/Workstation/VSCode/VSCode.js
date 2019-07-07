import * as React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { App } from '../../OSX'

const StyledVSCode = styled.div``

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
    <App title="VS Code" icon={<Img fluid={data.file.childImageSharp.fluid} />}>
      <StyledVSCode>VS Code</StyledVSCode>
    </App>
  )
}
