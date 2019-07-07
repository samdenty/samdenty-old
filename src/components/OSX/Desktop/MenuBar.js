import * as React from 'react'
import styled from '@emotion/styled'

const StyledMenuBar = styled.div`
  display: flex;
  backdrop-filter: blur(30px);
  background: rgba(22, 24, 27, 0.6);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23);

  height: 2em;
  max-height: 35px;
`

export const MenuBar = () => {
  return <StyledMenuBar>MENU</StyledMenuBar>
}
