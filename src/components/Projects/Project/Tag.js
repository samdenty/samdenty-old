import * as React from 'react'
import { styled } from 'linaria/react'
import { SmallButton } from '../../Button'

const StyledTag = styled(SmallButton)`
  margin: 3.5px 0;
  margin-right: 4px;
  transition: background-color 0.2s ease;
  background-color: rgba(255, 255, 255, 0.3);

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`

export const Tag = props => {
  return <StyledTag gradient={+false} {...props} />
}
