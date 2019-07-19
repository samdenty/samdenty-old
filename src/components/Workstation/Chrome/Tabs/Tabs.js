import * as React from 'react'
import { styled } from 'linaria/react'

import { observer } from 'mobx-react-lite'
import { Tab } from './Tab'
import { findIndex } from './find-index'
import { useTabs } from './useTabs'

const StyledTabs = styled.div`
  display: flex;
  height: 2em;
`

export const Tabs = observer(({ tabs = useTabs(), ...props }) => {
  return (
    <StyledTabs {...props}>
      {Array.from(tabs.items.values())
        .sort((a, b) => a.position - b.position)
        .map(tab => (
          <Tab
            key={tab.id}
            tab={tab}
            onDrag={offset => {
              tab.setPosition(findIndex(tab, offset, tabs))
            }}
          />
        ))}
    </StyledTabs>
  )
})
