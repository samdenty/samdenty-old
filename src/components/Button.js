import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { animatedGradientBox } from '../utils'

const baseButton = css`
  ${animatedGradientBox({
    borderRadius: '20px',
    blur: '9px',
    duration: 20 * 1000,
    gradientSize: 15,
    interactive: true,
  })}

  text-transform: uppercase;
  background: transparent;
  cursor: pointer;
  outline: none;

  border: none;
  border-radius: 20px;
  color: #fff;
  line-height: 24px;
  margin-right: 18px;
  padding: 5px 17px 7px;
  top: 0;
`

export const MediumButton = styled.button`
  ${baseButton}
`

export const SmallButton = styled.button`
  ${baseButton}
`

export const LargeButton = styled.button`
  ${baseButton}
`
