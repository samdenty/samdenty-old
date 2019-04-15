import { css } from '@emotion/core'
import { animatedGradient } from './animatedGradient'

export const animatedGradientText = ({ ...rest } = {}) =>
  css`
    @supports (-webkit-background-clip: text) {
      ${animatedGradient({
        degrees: 90,
        ...rest,
      })}
      color: transparent !important;
      background-clip: text;
      -webkit-background-clip: text;
    }
  `
