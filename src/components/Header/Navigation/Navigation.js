import * as React from 'react'
import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import { MediumButton } from '../../Button'
import { Link } from 'gatsby'
import { Search, useSearch } from '../../Search'
import { animatedGradientBox } from '../../../utils'

const StyledNavigation = styled.nav`
  display: flex;

  > * {
    margin: 0 8px;
  }

  @media (max-width: 950px) {
    display: none;
  }
`

const StyledItem = styled(MediumButton.withComponent(Link))`
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
`

StyledItem.defaultProps = {
  activeClassName: 'active',
}

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
  ${({ theme }) =>
    animatedGradientBox({
      duration: 30000,
      colors: theme.defaultGradient,
    })}

  position: absolute;
  backdrop-filter: blur(30px);
  border-radius: 12px;
  padding: 20px 0;
  width: 340px;
  margin-top: 20px;
  left: 50%;
  transform: translateX(-50%);

  &::before, &::after {
    opacity: 0.5;
  }
`

const SearchWrapper = styled.div`
  position: relative;
  margin-right: 10px;
`

export const Navigation = () => {
  const search = useSearch('')

  return (
    <StyledNavigation>
      <SearchWrapper>
        <SearchBar placeholder="Search" {...search.inputProps}></SearchBar>
        <StyledSearch search={search} />
      </SearchWrapper>

      <StyledItem partiallyActive to="/projects/">
        Projects
      </StyledItem>
    </StyledNavigation>
  )
}
