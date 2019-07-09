import React, { useEffect, useState } from 'react'
import Typist from 'react-typist'
import styled from '@emotion/styled'
import {
  Layout,
  SEO,
  InteractiveLaptop,
  Spotify,
  KeyboardProvider,
  useKeyboard,
  Workstation,
} from '../components'
import { useSpring, animated } from 'react-spring'
import { usePauseBackgroundEffect } from '../hooks'

const Section = styled.section`
  display: flex;
  justify-content: center;
`

const AnimatedLaptop = animated(InteractiveLaptop)

export default () => {
  const [paused, setPaused] = useState(true)
  const keyboard = useKeyboard()

  // Pause background to increase laptop animation performance
  usePauseBackgroundEffect(paused)
  useEffect(() => {
    const timer = setTimeout(() => setPaused(false), 4500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <KeyboardProvider keyboard={keyboard}>
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

        {/*<input
        type="range"
        min="-90"
        max="90"
        value={value}
        onChange={e => setValue(+e.target.value)}
      />*/}
        <Section>
          <animated.div
            style={useSpring({
              from: {
                opacity: 0.3,
                transform: 'translate(100vw, -15vh)',
              },
              to: {
                opacity: 1,
                transform: 'translate(0, 0)',
              },
              config: { mass: 1, tension: 40, friction: 9 },
            })}
          >
            <AnimatedLaptop
              x={-13}
              y={-11}
              z={0}
              {...useSpring({
                from: {
                  screenDegrees: -90,
                },
                to: {
                  screenDegrees: 0,
                },
                config: { mass: 1, tension: 150, friction: 80 },
                delay: 200,
              })}
            >
              <Workstation />
              {/*<Typist
                onCharacterTyped={char => {
                  const keyName = char === '🔙' ? 'delete' : char

                  keyboard.pressKey(keyName)
                }}
              >
                <span> First Sentence </span>
                <Typist.Backspace count={8} delay={200} />
                <span> Phrase </span>
              </Typist>*/}
            </AnimatedLaptop>
          </animated.div>
        </Section>

        {/**<Spotify />*/}
      </Layout>
    </KeyboardProvider>
  )
}
