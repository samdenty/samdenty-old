import React, { useEffect, useState } from 'react'
import Typist from 'react-typist'
import { styled } from 'linaria/react'
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
import { motion } from 'framer-motion'

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
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
              translateX: '100vw',
              translateY: '-15vh',
            }}
            animate={{
              scale: 1,
              opacity: 1,
              translateX: 0,
              translateY: 0,
            }}
            transition={{
              type: 'spring',
              damping: 15,
              duration: 2,
              delay: 0.3,
            }}
          >
            <AnimatedLaptop
              x={-11}
              y={-13}
              z={0}
              {...useSpring({
                from: {
                  screenDegrees: -90,
                },
                to: {
                  screenDegrees: 0,
                },
                config: { mass: 1, tension: 150, friction: 80 },
                delay: 700,
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
          </motion.div>
        </Section>

        {/**<Spotify />*/}
      </Layout>
    </KeyboardProvider>
  )
}
