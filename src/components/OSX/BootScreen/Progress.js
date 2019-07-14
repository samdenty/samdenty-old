import * as React from 'react'
import { styled } from 'linaria/react'
import { animated, useSpring } from 'react-spring'

const ProgressBar = styled.div`
  display: flex;
  width: 15.4em;
  background: rgba(170, 178, 255, 0.35);
  box-shadow: inset 0 0 0px 1px rgba(255, 255, 255, 0.15);
  border-radius: 2em;
  overflow: hidden;
  height: 0.8em;
`

const ProgressHandle = styled.div`
  background: rgba(255, 255, 255, 0.65);
`

export const Progress = animated(({ percent }) => (
  <ProgressBar>
    <ProgressHandle style={{ width: `${percent}%` }} />
  </ProgressBar>
))
