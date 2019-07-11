import * as React from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useApps } from '../App'
import { transaction } from 'mobx'

const StyledDockBar = styled.div`
  display: flex;
  justify-content: center;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
  box-shadow: 0px -2px 15px 0px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(30px);
  background: rgba(55, 58, 62, 0.4);
  border: 1px solid rgba(68, 72, 78, 0.6);
  align-self: center;
  border-bottom: none;
  height: 4.5em;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  cursor: pointer;
  user-select: none;
`

const Icon = styled.div`
  transition: filter 0.2s ease;
  width: 3em;
  height: 3em;
  margin: 0.4em 0.5em;

  ${Item}:hover & {
    filter: brightness(1.05);
  }

  ${Item}:active & {
    filter: brightness(0.8);
  }
`

const IndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`
const Indicator = styled.div`
  background: #aeafb1;
  border-radius: 1em;
  width: 0.2em;
  height: 0.2em;

  transition: opacity 0.2s ease;
`

export const DockBar = observer(() => {
  const apps = useApps()

  return (
    <StyledDockBar>
      {Array.from(apps.entries()).map(([id, app]) => (
        <Item
          ref={app.iconRef}
          key={id}
          onClick={() => {
            if (app.open) {
              if (app.visible && !app.focused) {
                app.focused = true
                return
              }

              app.visible = !app.visible
              return
            }

            app.open = true
          }}
        >
          <Icon>{app.icon}</Icon>
          <IndicatorContainer>
            <Indicator style={{ opacity: app.open ? 1 : 0 }} />
          </IndicatorContainer>
        </Item>
      ))}
    </StyledDockBar>
  )
})
