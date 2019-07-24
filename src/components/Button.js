import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { animatedGradientBox } from '../utils'
import { motion } from 'framer-motion'
import { withTheme } from '../theme'

const StyledButton = styled(motion.button)`
  font-family: Gilroy;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ gradient = true, theme }) =>
    gradient
      ? css`
          ${animatedGradientBox({
            colors: theme.defaultGradient,
            blur: '9px',
            borderWidth: '0px',
            interactive: true,
          })}
          border-radius: 20px;
          background: transparent;
        `
      : null}

  text-transform: uppercase;
  cursor: pointer;
  outline: none;

  border: none;
  border-radius: 20px;
  color: #fff;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.95);
  }
`

export const MediumButton = styled(StyledButton)`
  height: 40px;
  font-size: 15px;
  padding: 0 15px;
`

export const SmallButton = styled(StyledButton)`
  font-size: 13px;
  height: 20px;
  padding: 0 8px;
`

export const LargeButton = styled(StyledButton)``
