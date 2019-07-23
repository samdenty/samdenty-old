import * as React from 'react'
import { styled } from 'linaria/react'
import { withTheme } from '../../theme'
import { motion } from 'framer-motion'

const easeInOutCubic = [0.645, 0.045, 0.355, 1]

const StyledPage = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageInfo = styled(motion.section)`
  display: flex;
  padding-left: 1rem;
  overflow: hidden;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
`

const Title = styled(motion.h2)`
  font-size: 7rem;
  letter-spacing: 0.1em;
  text-shadow: 0 10px 30px rgba(2, 11, 22, 0.5);
  font-weight: 600;
  margin: 0;
  margin-bottom: 1.6rem;
`

const Description = styled(motion.p)`
  line-height: 1.5;
  font-size: 1.8rem;
  letter-spacing: 0.1em;
  margin: 0;
`

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const Line = withTheme(styled(motion.div)`
  width: 88px;
  height: 4px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.accentColor};

  &:last-child {
    margin-top: 13px;
    margin-left: 54px;
  }
`)

const TRANSITION_DELAY = 0.4

export const Page = ({ children, description, title }) => {
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
        variants={{
          hidden: {
            transition: { staggerChildren: 0.15, staggerDirection: -1 },
          },
          visible: {
            transition: {
              staggerChildren: 0.15,
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
            hidden: { translateX: '-100%' },
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
            hidden: { translateX: '-100%' },
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
