import * as React from 'react'
import AppleIcon from '../AppleIcon.svg'
import { styled } from 'linaria/react'
import { useSpring } from 'react-spring'
import { Progress } from './Progress'

const StyledBootScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const AppleLogo = styled(AppleIcon)`
  width: 8.5em;
  margin-bottom: 3.2em;
`

export const BootScreen = React.forwardRef(({ duration }, ref) => {
  const START_DELAY = Math.min(1500, duration * 0.3)
  const percent = useSpring({
    value: 100,
    from: { value: 0 },
    delay: START_DELAY,
    config: { duration: duration - START_DELAY },
  })

  return (
    <StyledBootScreen ref={ref}>
      <AppleLogo />
      <Progress percent={percent.value} />
    </StyledBootScreen>
  )
})
