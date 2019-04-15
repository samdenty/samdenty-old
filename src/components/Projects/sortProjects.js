export const sortProjects = (
  projects,
  { popularity = true, endDate = true } = {}
) => {
  projects.sort((a, b) => {
    let aDate = endDate ? a.end_date : a.start_date
    let bDate = endDate ? b.end_date : b.start_date

    if (endDate) {
      if (!aDate && !bDate) {
        aDate = a.start_date
        bDate = b.start_date
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
      if (!!a.featured === !!b.featured) return 0
      return a.featured ? -1 : 1
    })
  }
}
