import * as React from 'react'
import styled from '@emotion/styled'
import { MediumButton } from '../Button'
import { Link } from 'gatsby'
import { withProps } from 'recompose'
import { ExpandableModal } from '../ExpandableModal'

const StyledNavigation = styled.nav``

const StyledItem = styled(
  withProps({ activeClassName: 'active' })(MediumButton.withComponent(Link))
)`
  &.active {
    --computed-gradient-blur: 18px;

    &::before,
    &::after {
      opacity: 1;
    }

    &::after {
      margin-top: 5px;
    }
  }

  &::after {
    opacity: 0;
  }

  text-decoration: none;
  margin: 0 8px;
`

export const Navigation = () => {
  return (
    <StyledNavigation>
      <StyledItem partiallyActive to="/projects/">
        Projects
      </StyledItem>

      <StyledItem partiallyActive to="/blog/">
        Blog
      </StyledItem>
    </StyledNavigation>
  )
}
