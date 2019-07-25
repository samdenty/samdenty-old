import * as React from 'react'
import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import { withTheme } from '../../theme'
import { motion } from 'framer-motion'
import { animatedGradient } from '../../utils'
import { useRef } from 'react'

const easeInOutCubic = [0.645, 0.045, 0.355, 1]

const responsiveEm = (em, amount) =>
  `calc(${em * amount}em + ${em * 16 * (1 - amount)}px)`

const StyledPage = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre;
  height: 100%;
  width: 100%;

  @media (max-width: 1100px) {
    flex-direction: column-reverse;
  }
`

const PageInfo = styled(motion.section)`
  display: flex;
  padding: 0 1em;
  overflow: hidden;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  font-size: calc(0.6rem + 0.15vw + 0.15vh + 0.15vmin);

  @media (max-width: 1100px) {
    align-self: flex-start;
    font-size: calc(0.1rem + 1.4vw);
    margin-top: auto;
  }
`

const Title = styled(motion.h2)`
  font-size: 7em;
  letter-spacing: 0.1em;
  text-shadow: 0 10px 30px rgba(2, 11, 22, 0.5);
  font-weight: 600;
  margin: 0;
  margin-bottom: calc(1em * 0.16);
`

const Description = styled(motion.p)`
  line-height: 1.5;
  font-size: 1.8em;
  letter-spacing: 0.1em;
  margin: 0;
`

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
`

const Line = styled2(motion.div)`
  width: ${responsiveEm(5.5, 0.85)};
  height: ${responsiveEm(0.25, 0.85)};
  border-radius: 1em;
  ${({ theme }) => animatedGradient({ colors: theme.defaultGradient })}


  &:last-child {
    margin-top: 0.8em;
    margin-left: 3.3em;
  }
`

const TRANSITION_DELAY = 0.4

export const Page = ({ children, description, title }) => {
  const pageInfoRef = useRef()

  return (
    <StyledPage
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { delayChildren: TRANSITION_DELAY },
        },
      }}
    >
      <PageInfo
        ref={pageInfoRef}
        variants={{
          hidden: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
          },
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.2 + TRANSITION_DELAY,
            },
          },
          exit: {
            scale: 2,
          },
        }}
      >
        <Title
          transition={{ ease: easeInOutCubic, duration: 0.8 }}
          variants={{
            hidden: { translateX: '-120%' },
            visible: { translateX: 0 },
          }}
        >
          {title}
        </Title>
        <Lines>
          {[0, 0].map((_, i) => (
            <Line
              key={i}
              transition={{ ease: easeInOutCubic, duration: 0.8 }}
              variants={{
                hidden: { translateX: '-200%' },
                visible: { translateX: 0 },
              }}
            />
          ))}
        </Lines>

        <Description
          transition={{ ease: easeInOutCubic, duration: 0.8 }}
          variants={{
            hidden: { translateX: '-130%' },
            visible: { translateX: 0 },
          }}
        >
          {description}
        </Description>
      </PageInfo>
      {children}
    </StyledPage>
  )
}
