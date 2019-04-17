import React from 'react'
import { Link } from 'gatsby'
import { Layout, SEO, Projects } from '../components'

export default () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <Projects />

      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}
