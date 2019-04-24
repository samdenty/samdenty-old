import React, { useState } from 'react'

import { css } from '@emotion/core'
import { Layout, SEO, Spotify } from '../components'
import styled from '@emotion/styled'
import { animatedGradientBox, colourful, animatedGradient } from '../utils'

const Laptop = styled.div`
  width: 500px;
  height: 281px;
  transform: rotateX(-6deg) rotateY(-19deg) rotateZ(-4deg);
  transform: rotateX(-11deg) rotateY(-13deg) rotateZ(0deg);
  transform: rotateX(-87deg) rotateY(-19deg) rotateZ(-4deg);
  perspective: 1300px;
  perspective: 1000px;
  transform-style: preserve-3d;
  /* transform: perspective(400px) rotateY(-11deg); */

  /* @media (max-width: 1050px) {
    width: 80vw;
    height: 28vw;
  } */
`

const Screen = styled.div`
  ${animatedGradientBox({
    colors: colourful,
    borderWidth: '3px',
    blur: '70px',
  })};

  border-radius: 15px;
  padding: 1.5%;
  width: 100%;
  height: 100%;
`

const Chassis = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transform-style: preserve-3d;
  transform-origin: 0 0;
  transform: rotateX(90deg);

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
  border-radius: 15px;
  transform: translateZ(4px);
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

const Key = styled.div`
  min-width: 6.5%;
  margin: 0.3%;
  flex-grow: ${({ size = 1 }) => size};
  background: linear-gradient(#383840, #1b1b23);
  box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.7);
  border-radius: 10%;
  font-size: 10px;

  &:hover {
    background: red;
  }
`

export default () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <Section>
        <Laptop>
          <Screen>
            <img
              src="https://via.placeholder.com/1920x1080"
              css={css`
                width: 100%;
                height: 100%;
              `}
            />
          </Screen>
          <Chassis>
            <ChassisFace>
              <UpperChassis>
                <Speaker />
                <Keyboard>
                  <KeyRow>
                    <Key>`</Key>
                    <Key>1</Key>
                    <Key>2</Key>
                    <Key>3</Key>
                    <Key>4</Key>
                    <Key>5</Key>
                    <Key>6</Key>
                    <Key>7</Key>
                    <Key>8</Key>
                    <Key>9</Key>
                    <Key>0</Key>
                    <Key>-</Key>
                    <Key>+</Key>
                    <Key>delete</Key>
                  </KeyRow>
                  <KeyRow>
                    <Key>tab</Key>
                    <Key>Q</Key>
                    <Key>W</Key>
                    <Key>E</Key>
                    <Key>R</Key>
                    <Key>T</Key>
                    <Key>Y</Key>
                    <Key>U</Key>
                    <Key>I</Key>
                    <Key>O</Key>
                    <Key>P</Key>
                    <Key>[</Key>
                    <Key>]</Key>
                    <Key>\</Key>
                  </KeyRow>
                  <KeyRow>
                    <Key>caps lock</Key>
                    <Key>A</Key>
                    <Key>S</Key>
                    <Key>D</Key>
                    <Key>F</Key>
                    <Key>G</Key>
                    <Key>H</Key>
                    <Key>J</Key>
                    <Key>K</Key>
                    <Key>L</Key>
                    <Key>;</Key>
                    <Key>'</Key>
                    <Key>return</Key>
                  </KeyRow>
                  <KeyRow>
                    <Key>shift</Key>
                    <Key>Z</Key>
                    <Key>X</Key>
                    <Key>C</Key>
                    <Key>V</Key>
                    <Key>B</Key>
                    <Key>N</Key>
                    <Key>M</Key>
                    <Key>,</Key>
                    <Key>.</Key>
                    <Key>/</Key>
                    <Key>shift</Key>
                  </KeyRow>
                  <KeyRow>
                    <Key>fn</Key>
                    <Key>control</Key>
                    <Key>option</Key>
                    <Key>command</Key>
                    <Key>SPACE</Key>
                    <Key>command</Key>
                    <Key>option</Key>
                    <Key>LEFT</Key>
                    <Key>UPDOWN</Key>
                    <Key>RIGHT</Key>
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
