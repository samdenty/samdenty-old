import * as React from 'react'
import styled from '@emotion/styled'
import { Rnd } from 'react-rnd'
import { useTransition, animated } from 'react-spring'
import { useState } from 'react'

const StyledWindow = animated(styled(Rnd)`
  display: flex !important;
  cursor: default !important;
  flex-direction: column;
  overflow: hidden;
  background-color: #313234;
  border-radius: 0.4em;
  border: 1px solid #575760;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`)

const Content = styled('div')`
  flex-grow: 1;
`

const Buttons = styled('div')`
  display: flex;
  padding: 0.313em;
`

const Button = styled('div')`
  height: 1.125em;
  width: 1.125em;
  margin: 0 0.313em;
  border-radius: 100%;
  cursor: default;
`

const Close = styled(Button)`
  color: #820005;
  background: #fe4a50;
`

const Minimize = styled(Button)`
  color: #9a5518;
  background: #f9c32f;
`

const Zoom = styled(Button)`
  color: #006519;
  background: #00ca56;
`

export const Window = ({ children, visible, onClose, onMinimize, onZoom }) => {
  const [size, setSize] = useState({ width: 400, height: 300 })
  const [position, setPosition] = useState({ x: 30, y: 30 })

  const transitions = useTransition(visible, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <StyledWindow
          key={key}
          style={props}
          size={size}
          position={position}
          onDragStop={(_, p) => setPosition(p)}
          onResize={(_, __, ref) =>
            setSize({ width: ref.offsetWidth, height: ref.offsetHeight })
          }
        >
          <Buttons>
            <Close onClick={onClose} />
            <Minimize onClick={onMinimize} />
            <Zoom onClick={onZoom} />
          </Buttons>
          <Content>{children}</Content>
        </StyledWindow>
      )
  )
}
