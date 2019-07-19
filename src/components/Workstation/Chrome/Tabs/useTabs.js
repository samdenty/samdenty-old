import { useMemo } from 'react'
import { observable } from 'mobx'

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
            focused: false,
            position: tabs.items.size,
            ...data,
            id,

            setPosition(newPosition) {
              if (newPosition === tab.position) return

              const toRight = newPosition > tab.position

              for (const tabToAdjust of tabs.items.values()) {
                if (
                  toRight
                    ? tabToAdjust.position <= tab.position
                    : tabToAdjust.position >= tab.position
                )
                  continue

                if (
                  toRight
                    ? tabToAdjust.position > newPosition
                    : tabToAdjust.position < newPosition
                )
                  continue

                tabToAdjust.position += toRight ? -1 : 1
              }

              tab.position = newPosition
            },

            close() {
              tabs.items.delete(id)

              for (const tabToAdjust of tabs.items.values()) {
                if (!(tabToAdjust.position > tab.position)) continue

                tabToAdjust.position--
              }
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
