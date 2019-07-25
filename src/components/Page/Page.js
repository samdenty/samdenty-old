import * as React from 'react'
import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import { motion } from 'framer-motion'
import { animatedGradient, easeInOutCubic } from '../../utils'
import { useRef } from 'react'
import { useResizeObserver } from '../../hooks'

const responsiveEm = (em, amount) =>
  `calc(${em * amount}em + ${em * 16 * (1 - amount)}px)`

const StyledPage = styled(motion.div)`
  position: relative;
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
  pointer-events: none;
  display: flex;
  padding: 0 1em;
  overflow: hidden;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  font-size: calc(0.6rem + 0.15vw + 0.15vh + 0.15vmin);
  position: absolute;
  left: 0;
  z-index: 3;

  @media (min-width: 1101px) {
    margin-left: 11%;
  }

  @media (max-width: 1100px) {
    bottom: 0;
    font-size: calc(0.1rem + 1.4vw);
  }
`

const Placeholder = styled.div`
  flex-shrink: 1;
  pointer-events: none;
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
  padding-bottom: 0.5em;

  button,
  a {
    height: 2.5em;
    font-size: 1em;
    padding: 0 1.08em;
    border-radius: 100px;

    pointer-events: initial;
    margin-top: 1.5em;
  }
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
  const { height, width } = useResizeObserver(pageInfoRef)

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
      <Placeholder style={{ height, width }} />
      {children}
    </StyledPage>
  )
}
