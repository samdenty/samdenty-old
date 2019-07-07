import React from 'react'
import { Layout, SEO, Workstation } from '../components'

export default () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <Workstation />
    </Layout>
  )
}
