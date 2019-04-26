import React from 'react'
import Typist from 'react-typist'
import styled from '@emotion/styled'
import {
  Layout,
  SEO,
  InteractiveLaptop,
  Spotify,
  KeyboardProvider,
  useKeyboard,
} from '../components'

const Section = styled.section`
  display: flex;
  justify-content: center;
`

export default () => {
  const [value, setValue] = React.useState(0)
  const keyboard = useKeyboard()

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <input
        type="range"
        min="-90"
        max="90"
        value={value}
        onChange={e => setValue(+e.target.value)}
      />
      <Section>
        <KeyboardProvider keyboard={keyboard}>
          <InteractiveLaptop screenDegrees={value} x={-13} y={-11} z={0}>
            <Typist
              onCharacterTyped={char => {
                const keyName = char === '🔙' ? 'delete' : char

                keyboard.pressKey(keyName)
              }}
            >
              <span> First Sentence </span>
              <Typist.Backspace count={8} delay={200} />
              <span> Phrase </span>
            </Typist>
          </InteractiveLaptop>
        </KeyboardProvider>
      </Section>

      {/**<Spotify />*/}
    </Layout>
  )
}
