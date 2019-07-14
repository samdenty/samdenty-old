import * as React from 'react'
import { styled } from 'linaria/react'
import Select from 'react-select'
import { Project } from './Project'
import { useFilteredProjects } from './useFilteredProjects'
import { usePauseBackgroundEffect } from '../../hooks'
import { motion } from 'framer-motion'

const ProjectsFilter = styled.div`
  margin: 70px 0;
  z-index: 2;
`

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

export const Projects = () => {
  // Performance
  usePauseBackgroundEffect()

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
          onChange={languages => setVisibleLanguages(languages || [])}
          options={languages}
        />
        <Select
          isMulti
          placeholder="Type"
          getOptionValue={o => o.id}
          value={visibleTags}
          onChange={tags => setVisibleTags(tags || [])}
          options={tags}
        />
      </ProjectsFilter>
      <ProjectsGrid
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.04,
            },
          },
        }}
      >
        {filteredProjects.map((project, i) => (
          <Project
            {...project}
            onTagClick={tag => {
              setVisibleTags(tags => {
                const newTags = [...tags]
                if (!newTags.find(({ id }) => id === tag.id)) {
                  newTags.push(tag)
                }

                return newTags
              })
            }}
            key={project.id}
          >
            {project.excerpt}
          </Project>
        ))}
      </ProjectsGrid>
    </>
  )
}
