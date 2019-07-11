import * as React from 'react'
import styled from '@emotion/styled'
import { Rnd } from 'react-rnd'
import { useTransition, animated, useSpring } from 'react-spring'
import { useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'

const StyledWindow = styled(Rnd)`
  display: flex !important;
  cursor: default !important;
  flex-direction: column;
  overflow: hidden;
  background-color: #313234;
  border-radius: 0.4em;
  border: 1px solid #575760;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`

const Content = styled('div')`
  flex-grow: 1;
`

const Title = styled('div')`
  display: flex;
`

const Buttons = styled('div')`
  display: flex;
  padding: 0.313em;
`

const Button = styled('div')`
  height: 1.125em;
  width: 1.125em;
  margin: 0 0.313em;
  border-radius: 100%;
  cursor: default;
  background-color: ${({ colored, color }) =>
    colored ? color : 'rgba(255, 255, 255, 0.2)'};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ color }) => color};
  }
`

const AnimatedWindow = animated(
  ({ x, y, width, height, enableResizing, enableDragging, ...rest }) => (
    <StyledWindow
      position={{ x, y }}
      size={{ width, height }}
      enableResizing={enableResizing ? undefined : false}
      disableDragging={!enableDragging}
      {...rest}
    ></StyledWindow>
  )
)

const useBounds = initialBounds => {
  const [bounds, _setBounds] = useState(initialBounds)
  const stopAnimationRef = useRef(false)

  const setBounds = (updatedBounds, stopAnimation = false) => {
    _setBounds(bounds => {
      const newBounds = { ...bounds, ...updatedBounds }
      if (stopAnimation) {
        stopAnimationRef.current = true
      }

      return newBounds
    })
  }

  return { bounds, setBounds, stopAnimationRef }
}

export const Window = observer(
  ({
    app,
    children,
    onClose,
    onFocus,
    onMinimize,
    windowManagerRef,
    onZoom,
    maxHeight,
    maxWidth,
  }) => {
    const { bounds, setBounds, stopAnimationRef } = useBounds({
      width: 400,
      height: 300,
      x: 30,
      y: 30,
    })

    const windowManagerRect =
      !app.visible && windowManagerRef.current.getBoundingClientRect()
    const iconRect = !app.visible && app.iconRef.current.getBoundingClientRect()

    const animatedBounds = useSpring({
      x: app.visible
        ? app.zoomed
          ? 0
          : bounds.x
        : iconRect.x - windowManagerRect.x,
      y: app.visible
        ? app.zoomed
          ? 0
          : bounds.y
        : iconRect.y + iconRect.height * 2 - windowManagerRect.y,
      height: app.zoomed ? maxHeight : bounds.height,
      width: app.zoomed ? maxWidth : bounds.width,
      immediate: stopAnimationRef.current,
      config: {
        mass: 1,
        tension: 600,
        friction: 40,
      },
    })

    stopAnimationRef.current = false

    return (
      <AnimatedWindow
        style={{
          ...useSpring({
            opacity: app.visible ? 1 : 0,
          }),
          zIndex: app.zIndex,
        }}
        cancel="[data-nodrag]"
        width={animatedBounds.width}
        height={animatedBounds.height}
        x={animatedBounds.x}
        y={animatedBounds.y}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        enableResizing={!app.zoomed}
        enableDragging={!app.zoomed}
        onDragStop={(_, { x, y }) => {
          setBounds({ x, y }, true)
        }}
        onResize={(_, __, ref) => {
          setBounds({ width: ref.offsetWidth, height: ref.offsetHeight }, true)
        }}
        onMouseDown={onFocus}
      >
        <Title>
          <Buttons data-nodrag>
            <Button onClick={onClose} color="#fe4a50" colored={app.focused} />
            <Button
              onClick={onMinimize}
              color="#f9c32f"
              colored={app.focused}
            />
            <Button onClick={onZoom} color="#00ca56" colored={app.focused} />
          </Buttons>
        </Title>
        <Content data-nodrag>{children}</Content>
      </AnimatedWindow>
    )
  }
)
