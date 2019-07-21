import * as React from 'react'
import { motion } from 'framer-motion'
import { styled } from 'linaria/react'

const StyledItems = styled(motion.div)``

export const Items = ({ children }) => {
  return (
    <StyledItems
      variants={{
        open: {
          transition: { staggerChildren: 0.07, delayChildren: 0.2 },
        },
        closed: {
          transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
      }}
    >
      {children}
    </StyledItems>
  )
}
