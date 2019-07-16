import React from 'react'
import { MdxLayout } from '../components'
import { graphql } from 'gatsby'

export default ({ data }) => {
  return <MdxLayout data={data} />
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
        start_date
        end_date
        gradient
        logo {
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image {
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      body
    }
  }
`
