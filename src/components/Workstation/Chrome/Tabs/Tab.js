import * as React from 'react'
import styled from '@emotion/styled'
import CloseIcon from './CloseIcon.svg'
import BackgroundIcon from './BackgroundIcon.svg'
import { observer } from 'mobx-react-lite'

const StyledTab = styled.div`
  position: relative;
  display: flex;
  flex-basis: 100%;
  max-width: 13em;
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
  color: #414141;
  opacity: ${({ focused }) => (focused ? `1 !important` : 0)};
  flex-grow: 1;
  width: 100%;
  margin: 0 -0.56em;

  ${StyledTab}:hover & {
    opacity: 0.6;
  }
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
    <StyledTab onMouseDown={tab.focus}>
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
