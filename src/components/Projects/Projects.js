import * as React from 'react'
import styled from '@emotion/styled'
import Select from 'react-select'
import { Project } from './Project'
import { useFilteredProjects } from './useFilteredProjects'

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
  const {
    visibleLanguages,
    languages,
    visibleTags,
    setVisibleLanguages,
    setVisibleTags,
    tags,
    filteredProjects,
  } = useFilteredProjects()

  return (
    <>
      <ProjectsFilter>
        <Select
          isMulti
          getOptionValue={o => o.id}
          placeholder="Language"
          value={visibleLanguages}
          onChange={languages => setVisibleLanguages(languages)}
          options={languages}
        />
        <Select
          isMulti
          placeholder="Type"
          getOptionValue={o => o.id}
          value={visibleTags}
          onChange={tags => setVisibleTags(tags)}
          options={tags}
        />
      </ProjectsFilter>
      <ProjectsGrid>
        {filteredProjects.map((project, i) => (
          <Project
            title={project.title}
            tags={project.tags}
            logo={project.logo}
            onTagClick={tag => {
              setVisibleTags([tag])
            }}
            gradient={project.gradient}
            start_date={project.start_date}
            end_date={project.end_date}
            key={project.id}
          >
            {project.excerpt}
          </Project>
        ))}
      </ProjectsGrid>
    </>
  )
}
