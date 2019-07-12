import * as React from 'react'
import styled from '@emotion/styled'
import { Rnd } from 'react-rnd'
import { useTransition, animated, useSpring } from 'react-spring'
import { useState, useRef } from 'react'
import toPX from 'to-px'
import { observer } from 'mobx-react-lite'
import { AppContext } from '../../App'

const StyledWindow = styled(Rnd)`
  display: flex !important;
  cursor: default !important;
  flex-direction: column;
  overflow: hidden;
  background-color: #313234;
  border-radius: ${({ zoomed }) => (zoomed ? null : '0.4em')};
  padding: 1px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.22)
    ${({ zoomed }) =>
      zoomed
        ? null
        : `, 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)`};

  transition: box-shadow 0.4s ease, border-radius 0.4s ease;
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
  ({ app, windowManagerRef, maxHeight, maxWidth }) => {
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

    const { children, style, ...props } = app.props

    return (
      <AnimatedWindow
        {...props}
        style={{
          ...useSpring({
            opacity: app.visible ? 1 : 0,
          }),
          zIndex: app.zIndex,
          ...style,
        }}
        cancel="[data-nodrag]"
        width={animatedBounds.width}
        height={animatedBounds.height}
        x={animatedBounds.x}
        y={animatedBounds.y}
        minWidth={toPX('13em', windowManagerRef.current)}
        minHeight={toPX('10em', windowManagerRef.current)}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        enableResizing={!app.zoomed}
        enableDragging={!app.zoomed}
        zoomed={+app.zoomed}
        onDragStop={(_, { x, y }) => {
          setBounds({ x, y }, true)
        }}
        onResize={(_, __, ref) => {
          setBounds({ width: ref.offsetWidth, height: ref.offsetHeight }, true)
        }}
        onMouseDown={() => (app.focused = true)}
      >
        <AppContext.Provider value={app}>{children}</AppContext.Provider>
      </AnimatedWindow>
    )
  }
)
