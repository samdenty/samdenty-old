import * as R from 'react-contextmenu'
import styled from '@emotion/styled'

export const ContextMenu = styled(R.ContextMenu)`
  cursor: default;
  padding: 0.5em 0;
  z-index: 999999;
  min-width: 16.8em;
  transition: opacity 0.1s ease;
  outline: none;
  box-shadow: 0px 7px 14px rgba(0, 0, 0, 0.25), 0px 0px 3px rgba(0, 0, 0, 0.4);
  user-select: none;
  border-radius: 0.4em;
  background-color: rgba(52, 51, 51, 0.3);
  backdrop-filter: blur(30px);

  .react-contextmenu-item:not(.react-contextmenu-item--divider) {
    display: flex;
    color: #fff;
    height: 1.4em;
    line-height: 1.4em;
    outline: none;
    padding: 0 1.8em;
    transition: transform 0.05s ease;

    &:hover {
      color: #fff;
      background-color: #1f7cf7;
    }
  }

  .react-contextmenu-item--divider {
    height: 0.15em;
    margin: 0.3em 0;
    background: rgba(255, 255, 255, 0.13);
    pointer-events: none;
  }

  .react-contextmenu-item--disabled {
    color: #a2a2a2 !important;
    pointer-events: none !important;
  }
`
