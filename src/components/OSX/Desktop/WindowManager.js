import * as React from 'react'
import styled from '@emotion/styled'
import { useApps } from '../App'
import { observer } from 'mobx-react-lite'
import { Window } from './Window'

const StyledWindowManager = styled.div``

export const WindowManager = observer(() => {
  const apps = useApps()

  return Array.from(apps.entries()).map(([id, app]) =>
    app.open ? (
      <Window
        key={id}
        visible={app.visible}
        onClose={() => (app.open = false)}
        onMinimize={() => (app.visible = false)}
      >
        {app.children}
      </Window>
    ) : null
  )
})
