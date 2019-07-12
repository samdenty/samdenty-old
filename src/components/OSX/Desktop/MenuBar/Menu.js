import * as React from 'react'
import styled from '@emotion/styled'
import { useMemo, useRef, useState } from 'react'
import { ContextMenu, ContextMenuTrigger } from '../../ContextMenu'

const StyledMenu = styled.div`
  display: flex;
  line-height: 2em;
  padding: 0 0.5em;
  cursor: default;
  user-select: none;
  background: ${({ active }) =>
    active ? `linear-gradient(#1970de, #1c6fd9)` : null};

  > svg {
    flex-grow: 1;
  }
`

const StyledContextMenu = styled(ContextMenu)`
  position: absolute !important;
  max-width: 210px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`

let _id = 0

export const Menu = ({ children, name, ...props }) => {
  const [open, setOpen] = useState(false)
  const id = useMemo(() => `${++_id}`, [])
  const contextMenuRef = useRef()

  return (
    <>
      <ContextMenuTrigger id={id} ref={contextMenuRef}>
        <></>
      </ContextMenuTrigger>
      <StyledMenu
        active={open}
        onMouseDown={e => {
          e.clientX = e.currentTarget.offsetLeft
          e.clientY = e.currentTarget.offsetTop + e.currentTarget.offsetHeight

          contextMenuRef.current.handleContextClick(e)
        }}
        {...props}
      >
        {name}
      </StyledMenu>
      {children && (
        <StyledContextMenu
          id={id}
          onShow={() => setOpen(true)}
          onHide={() => setOpen(false)}
        >
          {children}
        </StyledContextMenu>
      )}
    </>
  )
}
