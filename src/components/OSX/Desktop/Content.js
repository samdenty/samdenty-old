import * as React from 'react'
import styled from '@emotion/styled'

const StyledContent = styled.div`
  position: relative;
  flex-grow: 1;
`

export const Content = ({ children }) => {
  return <StyledContent>Content{children}</StyledContent>
}
