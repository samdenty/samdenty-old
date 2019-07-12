import * as React from 'react'
import styled from '@emotion/styled'

const StyledBar = styled.div`
  display: flex;
  height: 2.25em;
  padding: 0.1em 0;
  background: #414141;
`

const Navigation = styled.div``

export const Bar = () => {
  return (
    <StyledBar data-nodrag>
      <Navigation></Navigation>
    </StyledBar>
  )
}
