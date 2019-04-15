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
            id
            excerpt
            timeToRead
            frontmatter {
              title
              gradient
              tags
              featured
              logo {
                publicURL
              }
              start_date
              end_date
              languages
            }
          }
        }
      }
    }
  `)

  return useMemo(() => {
    const projects = edges.map(({ node }) => ({
      ...node,
      ...node.frontmatter,
      logo: node.frontmatter.logo ? node.frontmatter.logo.publicURL : null,
    }))

    const tags = []

    projects.forEach(project => {
      project.tags.forEach(tag => {
        if (!tags.includes(tag)) tags.push(tag)
      })
    })

    return { projects, tags }
  }, [edges])
}
