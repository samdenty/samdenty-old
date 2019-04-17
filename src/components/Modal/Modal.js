import * as React from 'react'
import { useState, useRef, useLayoutEffect, createContext } from 'react'
import styled from '@emotion/styled'
import posed from 'react-pose'
import { Portal } from './Portal'

const ModalContext = createContext(null)

const Dialog = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  top: 0;
  left: 0;
`

const PosedModal = posed(Dialog)({
  visible: {
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
  inline: {
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
  hidden: {
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

export const Modal = ({
  children,
  inline = false,
  value = useState(false),
}) => {
  const modalRef = useRef()
  const [placeholderRect, setPlaceholderRect] = useState(null)
  const [open, setOpen] = value

  useLayoutEffect(() => {
    if (inline) {
      setPlaceholderRect(open ? modalRef.current.getBoundingClientRect() : null)
    }
  }, [open])

  const isolatableChildren = (
    <PosedModal
      onClick={event => {
        if (!open) return

        if (event.currentTarget === modalRef.current) {
          event.preventDefault()
          setOpen(false)
        }
      }}
      ref={modalRef}
      pose={open ? 'visible' : inline ? 'inline' : 'hidden'}
    >
      {children}
    </PosedModal>
  )

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

      {open && !inline ? (
        <Portal>{isolatableChildren}</Portal>
      ) : (
        isolatableChildren
      )}
    </ModalContext.Provider>
  )
}
