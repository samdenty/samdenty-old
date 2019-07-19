import * as React from 'react'
import { styled } from 'linaria/react'
import CloseIcon from './CloseIcon.svg'
import BackgroundIcon from './BackgroundIcon.svg'
import { observer } from 'mobx-react-lite'
import { motion, useMotionValue } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const StyledTab = styled(motion.div)`
  position: relative;
  user-select: none;
  display: flex;
  flex-basis: 100%;
  max-width: 13em;
  margin-right: -1px;

  &::before {
    content: '';
    height: 70%;
    top: 15%;
    left: 0;
    position: absolute;
    z-index: -1;
    border-left: 1px solid #4a4d51;
  }

  &:hover + &,
  &:hover,
  &:first-child,
  &[focused='1'] + & {
    &::before {
      display: none;
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
  transition: ${({ focused }) => (focused ? `none` : `opacity 0.2s ease`)};
  color: ${({ focused }) => (focused ? '#414141' : '#383838')};
  opacity: ${({ focused }) => (focused ? 1 : 0)};
  flex-grow: 1;
  width: 100%;
  margin: 0 -9px;

  ${StyledTab}:hover & {
    opacity: 1;
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

export const Tab = observer(({ tab, onDrag, ...props }) => {
  const tabRef = useRef()

  const [isDragging, setDragging] = useState(false)
  const dragOriginX = useMotionValue(0)

  useEffect(() => {
    tab.rect = {
      width: tabRef.current.offsetWidth,
      left: tabRef.current.offsetLeft,
    }
  })

  return (
    <StyledTab
      ref={tabRef}
      onTapStart={tab.focus}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      animate={
        isDragging
          ? { zIndex: 10 }
          : {
              zIndex: tab.focused ? 1 : 0,
              transition: { delay: 0.3 },
            }
      }
      dragOriginX={dragOriginX}
      positionTransition={({ delta }) => {
        if (isDragging) {
          dragOriginX.set(dragOriginX.get() + delta.x)
        }

        return !isDragging
      }}
      onDrag={(e, { point }) => {
        onDrag(point.x)
      }}
      onClick={tab.focus}
      focused={+tab.focused}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
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
