import * as React from 'react'
import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import { MediumButton } from '../Button'
import { Link } from 'gatsby'
import { withProps } from 'recompose'
import { Search, useSearch } from '../Search'
import { animatedGradientBox } from '../../utils'

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

const StyledSearch = styled2(Search)`
  ${animatedGradientBox({
    duration: 30000,
    colors: ['#be00e1', '#e1009c', '#e10053', '#ff9a02'],
  })}

  position: absolute;
  backdrop-filter: blur(30px);
  border-radius: 12px;
  padding: 20px 0;
  width: 340px;

  &::before, &::after {
    opacity: 0.5;
  }
`

export const Navigation = () => {
  const search = useSearch('')

  return (
    <StyledNavigation>
      <SearchBar placeholder="Search" {...search.inputProps}></SearchBar>

      <StyledItem partiallyActive to="/projects/">
        Projects
      </StyledItem>

      <StyledSearch search={search} />
    </StyledNavigation>
  )
}
