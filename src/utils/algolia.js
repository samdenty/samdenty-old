const pageQuery = `{
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
          image {
            publicURL
          }
          start_date(formatString: "MMM DD, YYYY")
          end_date(formatString: "MMM DD, YYYY")
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, fields, ...rest } }) => ({
    ...frontmatter,
    ...fields,
    image: frontmatter.image && frontmatter.image.publicURL,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.allMdx.edges),
    indexName: `Projects`,
    settings,
  },
]

module.exports = queries
