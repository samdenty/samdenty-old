import React from 'react'
import styled from '@emotion/styled'
import css from '@emotion/css'

import { FaSearch, FaAlgolia } from 'react-icons/fa'

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`

export const SearchIcon = styled(FaSearch)`
  width: 1em;
  pointer-events: none;
`

export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: ${props => props.theme.shortTrans};
  border-radius: ${props => props.theme.smallBorderRadius};
  ${props =>
    props.collapse
      ? css`
  width: 0;
  cursor: pointer;
  color: ${props.theme.lighterBlue};
  + ${SearchIcon} {
    color: white;
  }
  ${props.focus &&
    css`
      background: white;
      color: ${props.theme.darkerBlue};
      cursor: text;
      width: 5em;
      + ${SearchIcon} {
        color: ${props.theme.darkerBlue};
        margin: 0.3em;
      }
    `}
  margin-left: ${props.focus ? `-1.6em` : `-1em`};
  padding-left: ${props.focus ? `1.6em` : `1em`};
  ::placeholder {
    color: ${props.theme.gray};
  }
`
      : css`
          background: ${props.theme.lighterGray};
          width: 6em;
          margin-left: -1.6em;
          padding-left: 1.6em;
          + ${SearchIcon} {
            margin: 0.3em;
          }
        `};
`

export const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  background: ${props => props.theme.background};
  max-height: 80vh;
  overflow: scroll;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  ${props =>
    props.asGrid
      ? css`
          ul {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
            grid-gap: 1em;
            li {
              padding: 0.3em 0.5em;
              background: ${props.theme.lighterGray};
              border-radius: ${props.theme.smallBorderRadius};
            }
          }
        `
      : css`
          position: absolute;
          right: 0;
          top: calc(100% + 0.5em);
          width: 80vw;
          max-width: 30em;
          box-shadow: 0 0 5px 0;
          padding: 0.7em 1em 0.4em;
          border-radius: ${props.theme.smallBorderRadius};
          > * + * {
            padding-top: 1em !important;
            border-top: 2px solid ${props.theme.darkGray};
          }
          li + li {
            margin-top: 0.7em;
            padding-top: 0.7em;
            border-top: 1px solid ${props.theme.lighterGray};
          }
        `};
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  mark {
    color: ${props => props.theme.lighterBlue};
    background: ${props => props.theme.darkerBlue};
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: white;
      background: ${props => props.theme.gray};
      padding: 0.1em 0.4em;
      border-radius: ${props => props.theme.smallBorderRadius};
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
`

export const PoweredBy = () => (
  <span
    css={css`
      font-size: 0.6em;
      text-align: end;
      padding: 0;
    `}
  >
    Powered by{` `}
    <a href="https://algolia.com">
      <FaAlgolia size="1em" /> Algolia
    </a>
  </span>
)
