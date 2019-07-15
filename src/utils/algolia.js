const projectQuery = `{
  allMdx(
    filter: { fileAbsolutePath: { regex: "src/projects/" } }
  ) {
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        frontmatter {
          title
          logo {
            publicURL
            childImageSharp {
              fluid {
                base64
                aspectRatio
                src
                srcSet
                sizes
              }
            }
          }
          start_date(formatString: "MMM DD, YYYY")
          end_date(formatString: "MMM DD, YYYY")
        }
        excerpt(pruneLength: 999999)
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, fields, ...rest } }) => ({
    ...frontmatter,
    ...fields,
    logo:
      frontmatter.logo &&
      (frontmatter.logo.childImageSharp
        ? frontmatter.logo.childImageSharp.fluid
        : frontmatter.logo.publicURL),
    ...rest,
  }))

const queries = [
  {
    query: projectQuery,
    transformer: ({ data }) => flatten(data.allMdx.edges),
    indexName: `Projects`,
    settings: { attributesToSnippet: ['excerpt'] },
  },
]

module.exports = queries
