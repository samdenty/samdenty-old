import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { KeyboardContext } from './KeyboardProvider'

const StyledKeyboard = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: 0.3%;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
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

const StyledKey = styled.div`
  ${item}
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5% 0.8%;
  justify-content: ${({ align = 'center' }) => align};
  background: linear-gradient(#383840, #1b1b23);
  box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.7);
  border-radius: 10%;
  color: rgba(255, 255, 255, 0.8);
  font-family: Gilroy;

  transition: background-color 0.1s ease;

  ${({ text }) =>
    text
      ? css`
          font-size: 60%;
          align-items: flex-end;
        `
      : null}

  ${({ pressed }) => (pressed ? '&' : '&:active')} {
    background: linear-gradient(#0b0b13, #040409);
  }

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`

const KeyName = styled.span``

const Key = ({ name, ...rest }) => {
  const keyboardContext = React.useContext(KeyboardContext)
  const [pressed, setPressed] = React.useState(false)

  React.useEffect(() => {
    if (!keyboardContext) return
    let timer = null

    const off = keyboardContext.onPressKey((keyName, delay = 100) => {
      if (keyName.toLowerCase() !== name.toLowerCase()) return

      setPressed(true)
      const newTimer = setTimeout(() => {
        setPressed(false)
        timer = null
      }, delay)

      if (timer) clearTimeout(timer)
      timer = newTimer
    })

    return () => {
      off()
      clearTimeout(timer)
    }
  }, [keyboardContext, name])

  return (
    <StyledKey pressed={pressed} {...rest}>
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

export const Keyboard = () => {
  return (
    <StyledKeyboard>
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
        <Key size={5} name=" " />
        <Key size={1.2} text name="command" />
        <Key text name="option" />
        <ArrowKey name="◄" />
        <ArrowKeys>
          <ArrowKey name="▲" />
          <ArrowKey name="▼" />
        </ArrowKeys>
        <ArrowKey name="►" />
      </KeyRow>
    </StyledKeyboard>
  )
}
