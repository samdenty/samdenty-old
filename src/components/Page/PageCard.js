import * as React from 'react'
import { styled } from 'linaria/react'
import { motion } from 'framer-motion'
import { easeOutCubic, easeInOutQuart } from '../../utils'
import { withTheme } from '../../theme'

const StyledPageCard = withTheme(styled(motion.div)`
  position: relative;
  width: 53.125%;
  height: 74.81%;
  flex-shrink: 0;
  box-shadow: 0 80px 140px -40px rgba(0, 0, 0, 0.6);
  background: ${({ theme }) => theme.backgroundGradient[0]};
  overflow: hidden;

  @media (min-width: 1101px) {
    margin: 0 8% 0 auto;
  }

  @media (max-width: 1100px) {
    width: 100%;
    height: 85%;
  }
`)

const Cover = withTheme(styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: ${({ theme }) =>
    `linear-gradient(50deg, ${theme.defaultGradient.join(',')})`};
  background-size: 200%;

  & + & {
    background: ${({ theme }) => theme.backgroundGradient[0]};
  }
`)

export const PageCard = ({ children }) => {
  return (
    <StyledPageCard
      variants={{
        hidden: {
          scale: 0.85,
          translateX: '10%',
        },
        visible: {
          scale: 1,
          translateX: 0,
        },
      }}
      transition={{
        ease: easeOutCubic,
        duration: 1.5,
        delay: 0.5,
        delayChildren: 0.5,
      }}
    >
      {[0, 0].map((_, i) => (
        <Cover
          key={i}
          variants={{
            hidden: { translateX: 0 },
            visible: { translateX: '110%' },
          }}
          transition={{
            ease: easeInOutQuart,
            duration: 1.2 - 0.2 * i,
          }}
        />
      ))}

      {children}
    </StyledPageCard>
  )
}
