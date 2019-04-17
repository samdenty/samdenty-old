import * as React from 'react'
import { useState, useRef, useLayoutEffect, createContext } from 'react'
import styled from '@emotion/styled'
import posed from 'react-pose'
import { Modal, baseDialog } from './Modal'

const ExpandableDialog = styled.span`
  ${baseDialog}
`

const ExpandablePosedModal = posed(ExpandableDialog)({
  open: {
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

export const ExpandableModal = ({ value = useState(false), ...props }) => {
  const modalRef = useRef()
  const [placeholderRect, setPlaceholderRect] = useState(null)
  const [open] = value

  useLayoutEffect(() => {
    setPlaceholderRect(open ? modalRef.current.getBoundingClientRect() : null)
  }, [open])

  return (
    <>
      {placeholderRect && (
        <span
          style={{
            display: 'inline-block',
            height: placeholderRect.height,
            width: placeholderRect.width,
          }}
        />
      )}
      <Modal
        ref={modalRef}
        value={value}
        pose={props => <ExpandablePosedModal {...props} />}
        {...props}
      />
    </>
  )
}
