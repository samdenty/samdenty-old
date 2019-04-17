import * as React from 'react'
import { useState, useRef, useLayoutEffect, createContext } from 'react'
import styled from '@emotion/styled'
import posed from 'react-pose'
import { Portal } from './Portal'
import { css } from '@emotion/core'

const ModalContext = createContext(null)

export const baseDialog = css`
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  top: 0;
  left: 0;
`

const Dialog = styled.span`
  ${baseDialog};
  background-color: rgba(11, 1, 19, 0.8);
  z-index: 1000;
  position: fixed;
  width: 100vw;
  height: 100vh;
`

const PosedModal = posed(Dialog)({
  open: {
    applyAtStart: {
      display: null,
    },
    opacity: 1,
  },
  closed: {
    applyAtEnd: {
      display: 'none',
    },
    opacity: 0,
  },
})

export const useModalState = () => React.useContext(ModalContext)

export const Modal = React.forwardRef(
  (
    {
      children,
      pose = props => <PosedModal {...props} />,
      value = useState(false),
    },
    modalRef
  ) => {
    const ref = useRef()
    if (!modalRef) modalRef = ref
    const [open, setOpen] = value

    return (
      <ModalContext.Provider value={value}>
        {pose({
          children,
          onClick(event) {
            if (!open) return

            if (event.currentTarget === modalRef.current) {
              event.preventDefault()
              setOpen(false)
            }
          },
          ref: modalRef,
          pose: open ? 'open' : 'closed',
        })}
      </ModalContext.Provider>
    )
  }
)
