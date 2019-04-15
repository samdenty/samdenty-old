import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { animatedGradientBox } from '../utils'

const baseButton = ({ gradient = true }) => css`
  ${gradient
    ? css`
        ${animatedGradientBox({
          borderRadius: '20px',
          blur: '9px',
          duration: 20 * 1000,
          gradientSize: 15,
          interactive: true,
        })}
        background: transparent;
      `
    : null}

  text-transform: uppercase;
  cursor: pointer;
  outline: none;

  border: none;
  border-radius: 20px;
  color: #fff;
`

export const MediumButton = styled.button`
  ${baseButton}
  height: 40px;
  font-size: 15px;
  padding: 5px 15px;
`

export const SmallButton = styled.button`
  ${baseButton}

  font-size: 13px;
  height: 20px;
  padding: 2px 8px;
`

export const LargeButton = styled.button`
  ${baseButton}
`
