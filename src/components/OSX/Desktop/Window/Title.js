import * as React from 'react'
import styled from '@emotion/styled'
import { Buttons } from './Buttons'

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.div`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  padding-right: 0.2em;
  flex-grow: 5;
  color: rgba(255, 255, 255, 0.9);

  > * {
    text-align: left;
  }
`

const NameAligner = styled.div`
  flex-grow: 1;
  max-width: 6em;
  flex-shrink: 1;
`

export const Title = ({ children, ...rest }) => {
  return (
    <StyledTitle {...rest}>
      <Buttons />
      <Name>{children}</Name>
      <NameAligner />
    </StyledTitle>
  )
}
