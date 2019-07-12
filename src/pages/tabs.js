import React from 'react'
import { Layout, SEO, Workstation } from '../components'
import { useTabs, Tabs } from '../components/Workstation/Chrome/Tabs'

export default () => {
  const tabs = useTabs([
    {
      title: 'Facebook',
      favicon: <img src="https://www.facebook.com/favicon.ico" />,
    },
    {
      title: 'Facebook',
      favicon: <img src="https://www.facebook.com/favicon.ico" />,
    },
    {
      title: 'Facebook',
      favicon: <img src="https://www.facebook.com/favicon.ico" />,
    },
    {
      title: 'Google',
      favicon: <img src="https://www.facebook.com/favicon.ico" />,
    },
  ])

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <Tabs tabs={tabs} />
    </Layout>
  )
}
