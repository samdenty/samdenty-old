import * as React from 'react'
import styled from '@emotion/styled'
import { useStaticQuery, graphql } from 'gatsby'
import { sortProjects } from './sortProjects'
import { Project } from './Project'

const StyledProjects = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem 1.5rem;
`

export const Projects = () => {
  const [byPopularity, setByPopularity] = React.useState(true)

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
              tags
              featured
              start_date
              end_date
              languages
            }
          }
        }
      }
    }
  `)

  const projects = edges.map(({ node }) => node)

  sortProjects(projects, { popularity: byPopularity })

  return (
    <StyledProjects>
      {projects.map((project, i) => (
        <Project
          title={project.frontmatter.title}
          tags={project.frontmatter.tags}
          start_date={project.frontmatter.start_date}
          end_date={project.frontmatter.end_date}
          languages={project.frontmatter.languages}
          key={project.id}
        >
          {project.excerpt}
        </Project>
      ))}
    </StyledProjects>
  )
}
