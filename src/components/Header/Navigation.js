import * as React from 'react'
import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import { MediumButton } from '../Button'
import { Link } from 'gatsby'
import { withProps } from 'recompose'
import { Search, useSearch } from '../Search'

const StyledNavigation = styled.nav`
  > * {
    margin: 0 8px;
  }
`

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
`

const SearchBar = styled2(MediumButton.withComponent('input'))`
  background-color: rgba(255, 255, 255, 0.3);
  text-transform: none;
  backdrop-filter: blur(30px);
  cursor: text;

  ::placeholder {
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
  }
`

export const Navigation = () => {
  const search = useSearch('')

  return (
    <StyledNavigation>
      <StyledItem partiallyActive to="/projects/">
        Projects
      </StyledItem>

      <SearchBar placeholder="Search" {...search.inputProps}></SearchBar>
      <Search
        indices={[{ name: 'Projects', hitComp: 'ProjectHit' }]}
        search={search}
      />
    </StyledNavigation>
  )
}
