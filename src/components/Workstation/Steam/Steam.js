import * as React from 'react'
import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import SteamIcon from './SteamIcon.svg'
import { App, Title } from '../../OSX'

const SCALE = 0.5

const SteamPortal = styled.portal`
  flex-grow: 1;
  transform: scale(${SCALE});
  height: ${100 * (1 / SCALE)}%;
  width: ${100 * (1 / SCALE)}%;
  transform-origin: 0 0;
  pointer-events: hidden;
`

const StyledApp = styled2(App)`
  background-color: #171a21;
`

const StyledSteam = styled.div`
  display: block;
  flex-grow: 1;
`

export const Steam = () => {
  return (
    <StyledApp name="Steam" icon={<SteamIcon />}>
      <Title>steamcommunity.com/id/samdenty</Title>
      <StyledSteam>
        <SteamPortal src="https://steamcommunity.com/id/samdenty/"></SteamPortal>
      </StyledSteam>
    </StyledApp>
  )
}
