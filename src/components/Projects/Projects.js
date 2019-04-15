import * as React from 'react'
import styled from '@emotion/styled'
import Select from 'react-select'
import { sortProjects } from './sortProjects'
import { Project } from './Project'
import { useProjects } from './useProjects'

const ProjectsFilter = styled.div`
  margin: 70px 0;
  z-index: 2;
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

export const Projects = () => {
  const [byPopularity, setByPopularity] = React.useState(true)
  const { projects, tags } = useProjects()
  const initialOptions = React.useMemo(
    () => tags.map(tag => ({ value: tag, label: tag })),
    [tags]
  )
  const [visibleTags, setVisibleTags] = React.useState(initialOptions)

  const filteredProjects = projects.filter(
    project =>
      !project.tags ||
      visibleTags.find(({ value }) => project.tags.includes(value))
  )
  sortProjects(filteredProjects, { popularity: byPopularity })

  return (
    <>
      <ProjectsFilter>
        <Select
          isMulti
          value={visibleTags}
          onChange={tags => {
            setVisibleTags(tags.length ? tags : initialOptions)
          }}
          closeMenuOnSelect={false}
          options={initialOptions}
        />
      </ProjectsFilter>
      <ProjectsGrid>
        {filteredProjects.map((project, i) => (
          <Project
            title={project.title}
            tags={project.tags}
            logo={project.logo}
            onTagClick={id => {
              setVisibleTags([{ value: id, label: id }])
            }}
            gradient={project.gradient}
            start_date={project.start_date}
            end_date={project.end_date}
            languages={project.languages}
            key={project.id}
          >
            {project.excerpt}
          </Project>
        ))}
      </ProjectsGrid>
    </>
  )
}
