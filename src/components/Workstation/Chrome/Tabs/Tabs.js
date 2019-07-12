import * as React from 'react'
import styled from '@emotion/styled'
import { useMemo, useContext } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Tab } from './Tab'

const StyledTabs = styled.div`
  display: flex;
  height: 2em;
`

let _id = 0

export const useTabs = (initialTabs = []) =>
  useMemo(() => {
    const tabs = observable.object({
      items: observable.map(),

      addTab(data) {
        const id = ++_id
        const tab = observable.object(
          {
            title: 'New Tab',
            ...data,
            id,
            focused: false,

            close() {
              tabs.items.delete(id)
            },
            focus() {
              tab.focused = true

              for (const tabToUnfocus of tabs.items.values()) {
                if (tabToUnfocus === tab) continue

                tabToUnfocus.focused = false
              }
            },
          },
          undefined,
          {
            deep: false,
          }
        )

        tabs.items.set(id, tab)
        return tab
      },
    })

    initialTabs.forEach(data => tabs.addTab(data))

    return tabs
  }, [])

export const Tabs = observer(({ tabs = useTabs(), ...props }) => {
  return (
    <StyledTabs {...props}>
      {Array.from(tabs.items).map(([id, tab]) => (
        <Tab key={id} tab={tab} />
      ))}
    </StyledTabs>
  )
})
