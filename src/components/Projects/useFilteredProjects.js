import { useProjects } from './useProjects'
import { useMemo, useState } from 'react'
import { sortProjects } from './sortProjects'

export const useFilteredProjects = () => {
  const [byPopularity, setByPopularity] = useState(true)
  const { projects, tags, languages } = useProjects()
  const [visibleTags, setVisibleTags] = useState([])
  const [visibleLanguages, setVisibleLanguages] = useState([])

  const filteredProjects = projects
    .filter(
      project =>
        !project.tags ||
        !visibleTags.length ||
        visibleTags.find(({ id }) => project.tags.find(tag => tag.id === id))
    )
    .filter(
      project =>
        !project.languages ||
        !visibleLanguages.length ||
        visibleLanguages.find(({ id }) =>
          project.languages.find(tag => tag.id === id)
        )
    )
  sortProjects(filteredProjects, { popularity: byPopularity })

  return {
    filteredProjects,
    tags,
    languages,
    setByPopularity,
    projects,
    visibleTags,
    visibleLanguages,
    setVisibleTags,
    setVisibleLanguages,
  }
}
