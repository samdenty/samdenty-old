import * as React from 'react'
import { styled } from 'linaria/react'

const StyledContent = styled.div`
  position: relative;
  flex-grow: 1;
`

export const Content = ({ children }) => {
  return <StyledContent>Content{children}</StyledContent>
}
