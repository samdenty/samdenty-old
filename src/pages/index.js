import React, { useEffect, useState } from 'react'
import Typist from 'react-typist'
import { styled } from 'linaria/react'
import styled2 from '@emotion/styled'
import {
  Layout,
  SEO,
  InteractiveLaptop,
  Spotify,
  KeyboardProvider,
  useKeyboard,
  Workstation,
} from '../components'
import { usePauseBackgroundEffect } from '../hooks'
import { motion } from 'framer-motion'

const Section = styled.section`
  display: flex;
  justify-content: center;
`

const LaptopWrapper = styled(motion.div)`
  --laptop-width: 35vw;

  > * {
    margin: 3em 14em 18em;
  }
`

const Banner = styled.div`
  display: flex;
  align-items: center;
`

const Heading = styled.h2`
  flex-grow: 1;
`

const Laptop = () => (
  <LaptopWrapper
    initial={{ scale: 0, opacity: 0, translateX: '100vw', translateY: '-15vh' }}
    animate={{ scale: 1, opacity: 1, translateX: 0, translateY: 0 }}
    transition={{ type: 'spring', damping: 15, duration: 2, delay: 0.3 }}
  >
    <InteractiveLaptop
      x={-11}
      y={-13}
      z={0}
      initial={{ '--screen-degrees': -90 }}
      animate={{ '--screen-degrees': 0 }}
      transition={{ type: 'spring', damping: 100, stiffness: 40, delay: 0.7 }}
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
    </InteractiveLaptop>
  </LaptopWrapper>
)

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

        <Banner>
          <Heading>Developer Designer</Heading>
          <Section>
            <Laptop />
          </Section>
        </Banner>
        {/**<Spotify />*/}
      </Layout>
    </KeyboardProvider>
  )
}
