import * as React from 'react'
import AppleIcon from '../AppleIcon.svg'
import { styled } from 'linaria/react'
import { motion } from 'framer-motion'

const StyledBootScreen = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const AppleLogo = styled(AppleIcon)`
  width: 8.5em;
  margin-bottom: 3.2em;
`

const ProgressBar = styled.div`
  display: flex;
  width: 15.4em;
  background: rgba(170, 178, 255, 0.35);
  box-shadow: inset 0 0 0px 1px rgba(255, 255, 255, 0.15);
  border-radius: 2em;
  overflow: hidden;
  height: 0.8em;
`

const ProgressHandle = styled(motion.div)`
  background: rgba(255, 255, 255, 0.65);
`

export const BootScreen = ({ duration, ...props }) => {
  const START_DELAY = Math.min(1500, duration * 0.3)

  return (
    <StyledBootScreen {...props}>
      <AppleLogo />
      <ProgressBar>
        <ProgressHandle
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{
            duration: (duration - START_DELAY) / 1000,
            delay: START_DELAY / 1000,
          }}
        />
      </ProgressBar>
    </StyledBootScreen>
  )
}
