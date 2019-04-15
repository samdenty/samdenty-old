export const sortProjects = (
  projects,
  { popularity = true, endDate = true } = {}
) => {
  projects.sort((a, b) => {
    let aDate = endDate ? a.frontmatter.end_date : a.frontmatter.start_date
    let bDate = endDate ? b.frontmatter.end_date : b.frontmatter.start_date

    if (endDate) {
      if (!aDate && !bDate) {
        aDate = a.frontmatter.start_date
        bDate = b.frontmatter.start_date
      } else {
        if (!aDate) return -1
        if (!bDate) return 1
      }
    }

    if (aDate === bDate) return 0

    return +new Date(aDate) > +new Date(bDate) ? -1 : 1
  })

  if (popularity) {
    projects.sort((a, b) => {
      if (!!a.frontmatter.featured === !!b.frontmatter.featured) return 0
      return a.frontmatter.featured ? -1 : 1
    })
  }
}
