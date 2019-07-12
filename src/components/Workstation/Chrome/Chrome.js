import * as React from 'react'
import ChromeIcon from './ChromeIcon.svg'
import styled from '@emotion/styled'
import { App, Title, Menu } from '../../OSX'
import { Tabs, Tab, useTabs } from './Tabs'
import { Bar } from './Bar'

const StyledChrome = styled.div``

const StyledTitle = styled(Title)`
  padding-top: 0.5em;
  padding-right: 2.5em;
`

const StyledTabs = styled(Tabs)`
  margin-left: 0.5em;
`

const StyledApp = styled(App)`
  background: #2b2b2b;
`

export const Chrome = () => {
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
    <StyledApp
      name="Google Chrome"
      icon={<ChromeIcon />}
      menu={
        <>
          <Menu name="File" />
          <Menu name="Edit" />
          <Menu name="View" />
          <Menu name="Go" />
          <Menu name="Window" />
          <Menu name="Help" />
        </>
      }
    >
      <StyledTitle>
        <StyledTabs data-nodrag tabs={tabs} />
      </StyledTitle>
      <Bar />
      <StyledChrome></StyledChrome>
    </StyledApp>
  )
}
