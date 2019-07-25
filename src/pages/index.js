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
  Page,
} from '../components'
import { usePauseBackgroundEffect } from '../hooks'
import { motion, AnimatePresence } from 'framer-motion'
import useLockBodyScroll from 'react-use/lib/useLockBodyScroll'

const LaptopWrapper = styled(motion.div)`
  --laptop-width: calc(15vw + 15vh + 15vmin);

  @media (min-width: 1101px) {
    margin-left: 10vw;
  }

  @media (max-width: 1100px) {
    --laptop-width: 50vw;
  }

  > * {
    margin: 10em 10em 18em;
  }
`

const Laptop = () => (
  <LaptopWrapper
    variants={{
      hidden: {
        scale: 0,
        opacity: 0,
        translateX: '100%',
        translateY: '-15vh',
      },
      visible: {
        scale: 1,
        opacity: 1,
        translateX: 0,
        translateY: 0,
      },
    }}
    transition={{ type: 'spring', damping: 15, duration: 2 }}
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

const pages = [
  <Page
    title={
      <>
        SAM
        {'\n'}
        DENTY
      </>
    }
    description={
      <>
        web designer /{'\n'}
        software engineer.
      </>
    }
  >
    <Laptop />
  </Page>,
  <Page title="Work" description="test">
    test2
  </Page>,
  <Page
    title="About Me"
    description={
      <>
        I love Design, Technology,
        {'\n'} and Music.
      </>
    }
  >
    <Spotify />
  </Page>,
  <Page title="Get In Touch" description="test">
    test2
  </Page>,
]

const PageWrapper = styled(motion.div)`
  left: 0;
  width: 100%;
  height: 100%;

  @media (min-width: 1101px) {
    padding-bottom: 100px;
  }
`

export default () => {
  const [paused, setPaused] = useState(true)
  const keyboard = useKeyboard()

  useLockBodyScroll()
  // Pause background to increase laptop animation performance
  usePauseBackgroundEffect(paused)
  useEffect(() => {
    const timer = setTimeout(() => setPaused(false), 4500)
    return () => clearTimeout(timer)
  }, [])

  const [animating, setAnimating] = useState(false)
  const [[page, direction], setPage] = useState([0, 0])

  return (
    <KeyboardProvider keyboard={keyboard}>
      <Layout
        onWheel={({ deltaY }) => {
          if (animating || !deltaY) return

          const direction = deltaY > 0 ? 1 : -1
          const nextPage = page + direction
          if (nextPage > pages.length - 1 || nextPage < 0) return

          setPage([nextPage, direction])
          setAnimating(true)
        }}
      >
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

        <AnimatePresence initial={false} custom={direction}>
          <PageWrapper
            key={page}
            initial="enter"
            animate="visible"
            exit="exit"
            custom={direction}
            onAnimationComplete={() => setAnimating(false)}
            variants={{
              enter: direction => ({
                position: 'absolute',
                padding: 'inherit',
                pointerEvents: 'none',
                translateY: direction < 0 ? '-100vh' : '100vh',
              }),
              visible: {
                padding: 0,
                pointerEvents: 'initial',
                position: 'relative',
                translateY: 0,
              },
              exit: direction => ({
                position: 'absolute',
                padding: 'inherit',
                pointerEvents: 'none',
                translateY: direction < 0 ? '100vh' : '-100vh',
              }),
            }}
            transition={{
              ease: [0.645, 0.045, 0.355, 1],
              duration: 1,
            }}
          >
            {pages[page]}
          </PageWrapper>
        </AnimatePresence>
      </Layout>
    </KeyboardProvider>
  )
}
