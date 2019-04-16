import { useStaticQuery, graphql } from 'gatsby'
import { useMemo } from 'react'

export const useProjects = () => {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    query Projects {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            id
            excerpt(pruneLength: 123)
            timeToRead
            frontmatter {
              title
              gradient
              tags {
                id
                label
              }
              github
              featured
              logo {
                publicURL
              }
              start_date
              end_date
              languages {
                id
                label
              }
            }
          }
        }
      }
    }
  `)

  return useMemo(() => {
    const projects = edges.map(
      ({ node: { frontmatter, fields, ...node } }) => ({
        ...node,
        ...frontmatter,
        ...fields,
        logo: frontmatter.logo ? frontmatter.logo.publicURL : null,
      })
    )

    const tags = []
    projects.forEach(project => {
      if (!project.tags) return
      project.tags.forEach(tag => {
        if (!tags.find(({ id }) => id === tag.id)) tags.push(tag)
      })
    })

    const languages = []
    projects.forEach(project => {
      if (!project.languages) return
      project.languages.forEach(language => {
        if (!languages.find(({ id }) => id === language.id))
          languages.push(language)
      })
    })

    return { projects, languages, tags }
  }, [edges])
}
