import * as React from 'react'
import { useState, useRef, useLayoutEffect, createContext } from 'react'
import styled from '@emotion/styled'
import posed from 'react-pose'

const ModalContext = createContext(null)

const Modal = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  top: 0;
  left: 0;
`

const PosedModal = posed(Modal)({
  opened: {
    applyAtStart: {
      zIndex: 1000,
      display: null,
    },
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    backgroundColor: 'rgba(11, 1, 19, 0.8)',
    flip: true,
  },
  closed: {
    applyAtEnd: {
      display: 'inline-block',
    },
    applyAtStart: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    zIndex: 0,
    position: 'inherit',
    width: '100%',
    height: 'auto',
    flip: true,
  },
})

export const useModalState = () => React.useContext(ModalContext)

export const ExpandableModal = ({ children, value = useState(false) }) => {
  const modalRef = useRef()
  const [placeholderRect, setPlaceholderRect] = useState(null)
  const [open, setOpen] = value

  useLayoutEffect(() => {
    if (open) {
      setPlaceholderRect(modalRef.current.getBoundingClientRect())
    } else {
      setPlaceholderRect(null)
    }
  }, [open])

  return (
    <ModalContext.Provider value={value}>
      {placeholderRect && (
        <span
          style={{
            display: 'inline-block',
            height: placeholderRect.height,
            width: placeholderRect.width,
          }}
        />
      )}

      <PosedModal
        onClick={event => {
          if (!open) return

          if (event.currentTarget === modalRef.current) {
            event.preventDefault()
            setOpen(false)
          }
        }}
        ref={modalRef}
        pose={open ? 'opened' : 'closed'}
      >
        {children}
      </PosedModal>
    </ModalContext.Provider>
  )
}
