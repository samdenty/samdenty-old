import * as React from 'react'
import styled from '@emotion/styled'
import { SmallButton } from '../../Button'

const StyledTag = styled(SmallButton)`
  margin: 3px 2px;
  transition: background-color 0.2s ease;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(60px);

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`

export const Tag = props => {
  return <StyledTag gradient={false} {...props} />
}
