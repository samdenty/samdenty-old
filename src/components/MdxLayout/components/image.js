import * as React from 'react'
import styled from '@emotion/styled'
import { useModalState, ExpandableModal } from '../../ExpandableModal'

const Img = styled.img`
  max-width: 100%;
  border-radius: 5px;
  cursor: pointer;
`

const Link = styled('a')`
  display: contents;
`

export const img = ({ ...props }) => {
  const modalState = useModalState()
  const openState = modalState || React.useState(false)
  const [open, setOpen] = openState

  const children = (
    <Link
      href={props.src}
      target="_blank"
      onClick={event => {
        event.preventDefault()
        setOpen(!open)
      }}
    >
      <Img {...props} />
    </Link>
  )

  return modalState ? (
    children
  ) : (
    <ExpandableModal value={openState}>{children}</ExpandableModal>
  )
}
