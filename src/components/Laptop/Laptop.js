import * as React from 'react'
import styled from '@emotion/styled'
import { animatedGradientBox, colourful, animatedGradient } from '../../utils'

import { Keyboard } from './Keyboard'

const SCREEN_COLOR_BORDER = '0.5%'
const BORDER_RADIUS = '15px'

const SCREEN_DEPTH = '2px'
const CHASSIS_DEPTH = '4px'

const StyledLaptop = styled.div`
  width: 500px;
  height: 281px;
  font-size: 10px;
  perspective: 1000px;

  *,
  & {
    transform-style: preserve-3d;
  }
`

const Screen = styled.div`
  transform: rotateX(var(--degrees)) translateZ(-${SCREEN_DEPTH});
  transform-origin: 0 100%;
  padding: ${SCREEN_COLOR_BORDER};
  border-radius: ${BORDER_RADIUS};
  box-shadow: inset 0 0 35px rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 100%;
  background: grey;
`

const ScreenFace = styled.div`
  ${animatedGradientBox({
    colors: colourful,
    borderWidth: SCREEN_COLOR_BORDER,
    blur: '70px',
  })};

  &::after {
    opacity: var(--blurOpacity);
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

const Chassis = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${BORDER_RADIUS};
  box-shadow: inset 0 0 35px rgba(255, 255, 255, 0.2);
  transform-origin: 0 0;
  transform: rotateX(90deg) translateZ(-${CHASSIS_DEPTH});

  background: grey;
`

const ChassisFace = styled.div`
  &::before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.6;
    background: url(${require('../../assets/images/assault.png')});
  }

  background-color: #8e8e92;
  box-shadow: inset 0 3px 27px rgba(0, 0, 0, 0.2);
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

export const Laptop = React.forwardRef(
  ({ children, screenDegrees = 0, ...props }, ref) => {
    return (
      <StyledLaptop ref={ref} {...props}>
        <Screen style={{ '--degrees': `${screenDegrees}deg` }}>
          <ScreenFace
            style={{
              '--blurOpacity':
                screenDegrees < 0
                  ? Math.ceil((screenDegrees + 90) / 90 / 0.25) * 0.25
                  : 1,
            }}
          >
            <ScreenBackground>{children}</ScreenBackground>
          </ScreenFace>
        </Screen>
        <Lower />
      </StyledLaptop>
    )
  }
)