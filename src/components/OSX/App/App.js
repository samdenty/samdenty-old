import * as React from 'react'
import { useEffect, useContext } from 'react'
import { observable } from 'mobx'

export const AppContext = React.createContext(null)

export const useApps = () => useContext(AppContext)

export const App = ({
  icon,
  children,
  title,
  open = false,
  visible = open ? true : false,
  id = title,
}) => {
  const apps = useApps()

  const sync = obj => {
    for (const key of Object.keys(obj)) {
      const value = obj[key]

      useEffect(() => {
        const exists = apps.has(id)
        const app = exists
          ? apps.get(id)
          : observable.object({}, undefined, { deep: false })

        app[key] = value

        if (!exists) apps.set(id, app)
      }, [value])
    }

    useEffect(() => {
      return () => apps.delete(id)
    }, [id])
  }

  sync({ icon, children, title, open, visible })

  return null
}
