import * as React from 'react'
import { useEffect, useContext, useRef } from 'react'
import { observable, autorun } from 'mobx'

export const AppsContext = React.createContext(null)

export const AppContext = React.createContext(null)

export const useApps = () => useContext(AppsContext)
export const useApp = () => useContext(AppContext)

export const App = ({
  icon,
  menu,
  name,
  open = false,
  zoomed = false,
  visible = open ? true : false,
  id = name,
  ...props
}) => {
  const iconRef = useRef()
  const { apps } = useApps()

  const sync = obj => {
    for (const key of Object.keys(obj)) {
      const value = obj[key]

      useEffect(() => {
        let app = apps.get(id)

        if (!app) {
          app = observable.object(
            {
              iconRef,
              zIndex: null,
              get focused() {
                if (!this.zIndex) return false

                return this.zIndex === apps.size
              },

              set focused(focused) {
                if (this.focused === focused) return

                this.zIndex = focused ? apps.size : 1

                for (const app of apps.values()) {
                  if (this === app) continue
                  if (!app.zIndex) continue

                  if (!focused) {
                    app.zIndex++
                    continue
                  }

                  if (app.zIndex > 1) {
                    app.zIndex--
                  }
                }
              },
            },
            undefined,
            { deep: false }
          )
        }

        app[key] = value

        if (!apps.has(id)) apps.set(id, app)
      }, [value])
    }

    useEffect(() => {
      const app = apps.get(id)

      let visibleTimer
      const disposers = [
        autorun(() => {
          app.focused = app.visible
        }),
        autorun(() => {
          clearTimeout(visibleTimer)

          if (app.open) {
            visibleTimer = setTimeout(() => (app.visible = true))
          } else {
            app.visible = false
          }
        }),
      ]

      return () => {
        apps.delete(id)
        disposers.forEach(dispose => dispose())
      }
    }, [id])
  }

  sync({ icon, name, open, visible, id, zoomed, menu, props })

  return null
}
