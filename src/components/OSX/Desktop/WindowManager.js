import * as React from 'react'
import styled from '@emotion/styled'
import { useApps } from '../App'
import { observer } from 'mobx-react-lite'
import { Window } from './Window'
import { useRef, useMemo } from 'react'
import { useResizeObserver } from '../../../hooks'

const StyledWindowManager = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

export const WindowManager = observer(() => {
  const { apps } = useApps()
  const windowManagerRef = useRef(null)
  const { width, height } = useResizeObserver(windowManagerRef)

  const openApps = Array.from(apps.values()).filter(app => app.open)

  return (
    <StyledWindowManager ref={windowManagerRef}>
      {openApps.map(app => (
        <Window
          key={app.id}
          app={app}
          maxWidth={width}
          maxHeight={height}
          windowManagerRef={windowManagerRef}
        />
      ))}
    </StyledWindowManager>
  )
})
