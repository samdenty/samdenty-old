import * as React from 'react'
import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import { animatedGradientBox, colourful } from '../../utils'
import AppleIcon from '../OSX/AppleIcon.svg'

import { Keyboard } from './Keyboard'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const SCREEN_COLOR_BORDER = '0.3em'
const BORDER_RADIUS = '1em'

const SCREEN_DEPTH = '0.2em'
const CHASSIS_DEPTH = '0.4em'

const StyledLaptop = styled(motion.div)`
  --screen-degrees: 0;

  width: var(--laptop-width);
  height: calc(var(--laptop-width) / 16 * 9);
  font-size: calc(var(--laptop-width) * 0.02);
  perspective: calc(var(--laptop-width) * 2.2);

  *,
  & {
    transform-style: preserve-3d;
  }
`

const Aluminum = styled.div`
  background: #6c6c70;
  background-image: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.34) 0%,
    rgba(0, 0, 0, 0) 100%
  );

  box-shadow: inset 0 0 7em rgba(0, 0, 0, 0.2),
    inset 0 0.3em 3em rgba(56, 55, 58, 0.2),
    inset 0 0.3em 1em rgba(56, 55, 58, 0.2), 0 2em 5em rgba(0, 0, 0, 0.05),
    0 2em 1em rgba(0, 0, 0, 0.02);
`

const Screen = styled(Aluminum)`
  transform: rotateX(calc(var(--screen-degrees) * 1deg))
    translateZ(-${SCREEN_DEPTH});
  transform-origin: 0 100%;
  padding: ${SCREEN_COLOR_BORDER};
  border-radius: ${BORDER_RADIUS};
  width: 100%;
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    height: 188%;
    width: 150%;
    top: -44%;
    left: -25%;
    border-radius: 15%;
  }
`

const ScreenFace = styled2.div`
  ${animatedGradientBox({
    colors: colourful,
    borderWidth: SCREEN_COLOR_BORDER,
    blur: '70px',
  })};

  &::before,
  &::after {
    opacity: var(--blur-opacity);
  }

  width: 100%;
  height: 100%;
  transform: translateZ(${SCREEN_DEPTH});
  border-radius: inherit;
`

const ScreenBackground = styled.div`
  width: 100%;
  height: 100%;
  padding: calc(7px + 0.4%);
  border-radius: inherit;
  background: black;
`

const Chassis = styled(Aluminum)`
  width: 100%;
  height: 100%;
  border-radius: ${BORDER_RADIUS};
  transform-origin: 0 0;
  transform: rotateX(90deg) translateZ(-${CHASSIS_DEPTH});

  &::after {
    content: '';
    position: absolute;
    height: 188%;
    width: 150%;
    top: -44%;
    left: -25%;
    border-radius: 15%;
  }
`

const ChassisFace = styled(Aluminum)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  transform: translateZ(${CHASSIS_DEPTH});
`

const UpperChassis = styled.div`
  display: flex;
  margin-top: 7%;
  width: 100%;
  height: 40%;
`

const Speaker = styled.div`
  background-image: linear-gradient(45deg, #323131 25%, transparent 25%),
    linear-gradient(-45deg, #323131 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #323131 75%),
    linear-gradient(-45deg, transparent 75%, #323131 75%);
  background-size: 2px 2px;
  background-position: 0 0, 1px 0, 1px -1px, 0px 1px;
  width: 11%;
  margin: 0.3% 0.7%;
`

const TrackPad = styled.div`
  margin-top: auto;
  height: 38%;
  width: 47%;
  border: 1px solid rgba(0, 0, 0, 0.9);
  background: url(${require('../../assets/images/light-aluminum.png')});
  opacity: 0.2;
  border-radius: 4%;
`

const Nub = styled.div`
  width: 15%;
  height: 4.5%;
  border-radius: 35%;
  margin-top: 1%;
  margin-bottom: -1.65%;
  background: radial-gradient(rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.4));
`

const AppleLogo = styled(AppleIcon)`
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scaleX(-1);
  height: 23%;

  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
`

const Lower = React.memo(() => {
  return (
    <Chassis>
      <ChassisFace>
        <UpperChassis>
          <Speaker />
          <Keyboard />
          <Speaker />
        </UpperChassis>
        <TrackPad />
        <Nub />
      </ChassisFace>
    </Chassis>
  )
})

export const Laptop = ({ children, ...props }) => {
  const screenDegrees = useMotionValue(0)
  const [mountChildren, setMountChildren] = React.useState(false)
  const blurOpacity = useTransform(
    screenDegrees,
    degrees =>
      (degrees < 0 ? Math.ceil((degrees + 90) / 90 / 0.25) * 0.25 : 1) * 0.6
  )

  React.useEffect(
    () =>
      screenDegrees.onChange(degrees => {
        setMountChildren(degrees > -85)
      }),
    []
  )

  return (
    <StyledLaptop
      {...props}
      style={{
        '--blur-opacity': blurOpacity,
        '--screen-degrees': screenDegrees,
        ...props.style,
      }}
    >
      <Screen>
        <AppleLogo />
        <ScreenFace>
          <ScreenBackground>{mountChildren && children}</ScreenBackground>
        </ScreenFace>
      </Screen>
      <Lower />
    </StyledLaptop>
  )
}
