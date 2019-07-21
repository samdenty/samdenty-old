import * as React from 'react'
import { styled } from 'linaria/react'
import { motion } from 'framer-motion'
import { Toggle } from './Toggle'
import { useState } from 'react'
import { Items } from './Items'

const PADDING = 20

const StyledDrawer = styled(motion.nav)`
  position: relative;
  color: #fff;
  height: 60px;
  width: 60px;
  flex-shrink: 0;
`

const Background = styled(motion.div)`
  position: absolute;
  height: calc(100vh + ${PADDING}px);
  width: 40vw;
  margin: -${PADDING}px 0 0 -${PADDING}px;
  padding: ${PADDING}px 0 0 ${PADDING}px;
  background: rgba(49, 49, 52, 0.4);
  backdrop-filter: blur(50px);

  > * {
    pointer-events: initial;
  }
`

export const Drawer = () => {
  const [open, setOpen] = useState(false)

  return (
    <StyledDrawer initial={false} animate={open ? 'open' : 'closed'}>
      <Background
        variants={{
          open: (height = 1000) => ({
            clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
            pointerEvents: 'initial',
            transition: {
              type: 'spring',
              stiffness: 20,
              restDelta: 2,
            },
          }),
          closed: {
            pointerEvents: 'none',
            clipPath: `circle(30px at ${PADDING + 30}px ${PADDING + 30}px)`,
            transition: {
              delay: 0.5,
              type: 'spring',
              stiffness: 400,
              damping: 40,
            },
          },
        }}
      >
        <Toggle toggle={() => setOpen(!open)} />
        <Items>test</Items>
      </Background>
    </StyledDrawer>
  )
}
