import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import CloseIcon from './CloseIcon.svg'
import BackgroundIcon from './BackgroundIcon.svg'
import { observer } from 'mobx-react-lite'

const StyledTab = styled.div`
  position: relative;
  user-select: none;
  display: flex;
  flex-basis: 100%;
  max-width: 13em;
  z-index: ${({ focused }) => (focused ? 5 : null)};
  margin-right: -1px;

  &::before {
    content: '';
    height: 70%;
    top: 15%;
    right: 0;
    position: absolute;
    z-index: -1;
    border-right: 1px solid #4a4d51;
  }

  &:last-child {
    &::before {
      border: none;
    }
  }
`

const Favicon = styled.div`
  height: 1em;
  width: 1em;
  flex-shrink: 0;
  margin-right: 0.5em;

  > * {
    height: 100%;
    width: 100%;
  }
`

const Title = styled.div`
  flex-grow: 1;
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    #000 0%,
    #000 calc(100% - 24px),
    transparent
  );
`

const Close = styled.button`
  display: flex;
  flex-shrink: 0;
  border: none;
  border-radius: 100%;
  height: 1em;
  width: 1em;
  padding: 0.2em;
  color: rgba(154, 160, 166, 0.8);
  background: transparent;
  outline: none;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
    background-color: rgba(255, 255, 255, 0.4);
  }

  &:active {
    color: rgba(255, 255, 255, 0.8);
    background-color: rgba(255, 255, 255, 0.5);
  }

  svg {
    flex-grow: 1;
  }
`

const Background = styled(BackgroundIcon)`
  pointer-events: none;
  transition: ${({ focused }) => (focused ? null : `opacity 0.2s ease`)};
  color: ${({ focused }) => (focused ? '#414141' : '#383838')};
  opacity: ${({ focused }) => (focused ? 1 : 0)};
  flex-grow: 1;
  width: 100%;
  margin: 0 -11px;

  ${({ focused }) => (focused ? null : `${StyledTab}:hover & { opacity: 1 }`)}
`

const Content = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0 0.4em;
`

export const Tab = observer(({ tab }) => {
  return (
    <StyledTab
      onMouseDown={tab.focus}
      onClick={tab.focus}
      focused={+tab.focused}
    >
      <Background focused={+tab.focused} />
      <Content>
        <Favicon>{tab.favicon}</Favicon>
        <Title>{tab.title}</Title>

        <Close onClick={tab.close}>
          <CloseIcon />
        </Close>
      </Content>
    </StyledTab>
  )
})
