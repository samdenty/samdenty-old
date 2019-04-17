import * as React from 'react'
import styled from '@emotion/styled'
import { ExpandableModal } from '../../ExpandableModal'

const StyledSpan = styled.span`
  &.gatsby-resp-image-wrapper {
    width: 100%;
  }
`
export const span = ({ children, ...props }) => {
  const span = <StyledSpan {...props}>{children}</StyledSpan>

  if (props.className === 'gatsby-resp-image-wrapper') {
    return <ExpandableModal>{span}</ExpandableModal>
  }

  return span
}