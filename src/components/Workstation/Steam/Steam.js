import * as React from 'react'
import styled from '@emotion/styled'
import SteamIcon from './SteamIcon.svg'
import { App } from '../../OSX'

const SCALE = 0.5

const SteamPortal = styled.portal`
  flex-grow: 1;
  transform: scale(${SCALE});
  height: ${100 * (1 / SCALE)}%;
  width: ${100 * (1 / SCALE)}%;
  transform-origin: 0 0;
  pointer-events: hidden;
`

export const Steam = () => {
  return (
    <App title="Steam" icon={<SteamIcon />}>
      <SteamPortal src="https://steamcommunity.com/id/samdenty/"></SteamPortal>
    </App>
  )
}
