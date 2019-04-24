import React, { useState } from 'react'

import { css } from '@emotion/core'
import { Layout, SEO, Spotify } from '../components'
import styled from '@emotion/styled'
import { animatedGradientBox, colourful, animatedGradient } from '../utils'

const Laptop = styled.div`
  width: 500px;
  height: 281px;
  font-size: 10px;

  transform: rotateX(-6deg) rotateY(-19deg) rotateZ(-4deg);
  transform: rotateX(-11deg) rotateY(-13deg) rotateZ(0deg);
  /* transform: rotateX(-87deg) rotateY(-19deg) rotateZ(-4deg); */
  perspective: 1300px;
  perspective: 1000px;
  transform-style: preserve-3d;
  /* transform: perspective(400px) rotateY(-11deg); */

  /* @media (max-width: 1050px) {
    width: 80vw;
    height: 28vw;
  } */
`

const SCREEN_COLOR_BORDER = '2px'
const BORDER_RADIUS = '15px'

const SCREEN_DEPTH = '2px'
const CHASSIS_DEPTH = '4px'

const Screen = styled.div`
  transform: rotateX(0deg) translateZ(-${SCREEN_DEPTH});
  transform-origin: 0 100%;
  transform-style: preserve-3d;
  background: white;
  padding: ${SCREEN_COLOR_BORDER};
  border-radius: ${BORDER_RADIUS};

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

  width: 100%;
  height: 100%;
  transform: translateZ(${SCREEN_DEPTH});
  border-radius: inherit;
`

const ScreenBackground = styled.div`
  width: 100%;
  height: 100%;
  padding: 2%;
  border-radius: inherit;
  background: black;
`

const Chassis = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${BORDER_RADIUS};
  transform-style: preserve-3d;
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
    background: url(${require('../assets/images/assault.png')});
  }

  ${animatedGradient({
    colors: ['#6e6e76', '#8e8e92', '#6e6e76'],
  })};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  transform: translateZ(${CHASSIS_DEPTH});
  transform-style: preserve-3d;
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

const Keyboard = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: 0.3%;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`

const TrackPad = styled.div`
  margin-top: auto;
  height: 38%;
  width: 47%;
  border: 1px solid rgba(0, 0, 0, 0.9);
  background: url(${require('../assets/images/light-aluminum.png')});
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

const Section = styled.section`
  display: flex;
  justify-content: center;
`

const KeyRow = styled.div`
  display: flex;
  flex-grow: 1;
`

const item = ({ size = 1 }) => css`
  min-width: ${6.5 * size}%;
  flex-grow: 1;
  margin: 0.3%;
`

const key = ({ text, align = 'center' }) => css`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5% 0.8%;
  justify-content: ${align};
  background: linear-gradient(#383840, #1b1b23);
  box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.7);
  border-radius: 10%;
  color: rgba(255, 255, 255, 0.8);
  font-family: Gilroy;

  ${text
    ? css`
        font-size: 60%;
        align-items: flex-end;
      `
    : null}

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`

const StyledKey = styled.div`
  ${item}
  ${key}
`

const KeyName = styled.span``

const Key = ({ name, ...rest }) => {
  return (
    <StyledKey {...rest}>
      <KeyName>{name}</KeyName>
    </StyledKey>
  )
}

const ArrowKeys = styled.div`
  ${item}

  display: flex;
  flex-direction: column;

  ${StyledKey} {
    &:last-child {
      margin-top: 5%;
    }
  }
`

const ArrowKey = styled(Key)`
  font-size: 70%;
`

export default () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <Section>
        <Laptop>
          <Screen>
            <ScreenFace>
              <ScreenBackground>
                <img
                  src="https://via.placeholder.com/1920x1080"
                  css={css`
                    width: 100%;
                    height: 100%;
                  `}
                />
              </ScreenBackground>
            </ScreenFace>
          </Screen>
          <Chassis>
            <ChassisFace>
              <UpperChassis>
                <Speaker />
                <Keyboard>
                  <KeyRow>
                    <Key name="`" />
                    <Key name="1" />
                    <Key name="2" />
                    <Key name="3" />
                    <Key name="4" />
                    <Key name="5" />
                    <Key name="6" />
                    <Key name="7" />
                    <Key name="8" />
                    <Key name="9" />
                    <Key name="0" />
                    <Key name="-" />
                    <Key name="+" />
                    <Key size={1.1} text align="flex-end" name="delete" />
                  </KeyRow>
                  <KeyRow>
                    <Key size={1.1} text align="flex-start" name="tab" />
                    <Key name="Q" />
                    <Key name="W" />
                    <Key name="E" />
                    <Key name="R" />
                    <Key name="T" />
                    <Key name="Y" />
                    <Key name="U" />
                    <Key name="I" />
                    <Key name="O" />
                    <Key name="P" />
                    <Key name="[" />
                    <Key name="]" />
                    <Key name="\" />
                  </KeyRow>
                  <KeyRow>
                    <Key size={1.6} text align="flex-start" name="caps lock" />
                    <Key name="A" />
                    <Key name="S" />
                    <Key name="D" />
                    <Key name="F" />
                    <Key name="G" />
                    <Key name="H" />
                    <Key name="J" />
                    <Key name="K" />
                    <Key name="L" />
                    <Key name=";" />
                    <Key name="'" />
                    <Key size={1.6} text align="flex-end" name="return" />
                  </KeyRow>
                  <KeyRow>
                    <Key size={2.15} text align="flex-start" name="shift" />
                    <Key name="Z" />
                    <Key name="X" />
                    <Key name="C" />
                    <Key name="V" />
                    <Key name="B" />
                    <Key name="N" />
                    <Key name="M" />
                    <Key name="," />
                    <Key name="." />
                    <Key name="/" />
                    <Key size={2.15} text align="flex-end" name="shift" />
                  </KeyRow>
                  <KeyRow>
                    <Key text align="flex-start" name="fn" />
                    <Key text name="control" />
                    <Key text name="option" />
                    <Key size={1.2} text name="command" />
                    <Key size={5} />
                    <Key size={1.2} text name="command" />
                    <Key text name="option" />
                    <ArrowKey name="◄" />
                    <ArrowKeys>
                      <ArrowKey name="▲" />
                      <ArrowKey name="▼" />
                    </ArrowKeys>
                    <ArrowKey name="►" />
                  </KeyRow>
                </Keyboard>
                <Speaker />
              </UpperChassis>
              <TrackPad />
              <Nub />
            </ChassisFace>
          </Chassis>
        </Laptop>
      </Section>

      {/**<Spotify />*/}
    </Layout>
  )
}
