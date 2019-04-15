import { animatedGradient } from './animatedGradient'
import { css } from '@emotion/core'

export const animatedGradientBox = ({
  duration = undefined,
  colors = undefined,
  gradientSize = undefined,
  borderWidth = '2px',
  borderRadius = '3px',
  interactive = false,
  blur = '9px',
} = {}) => css`
  --computed-gradient-blur: ${blur};

  z-index: 1;
  position: relative;
  background: black;
  background: linear-gradient(0deg, #000, #262626);

  &::before,
  &::after {
    ${animatedGradient({ colors, gradientSize, duration })};
    content: '';
    position: absolute;
    border-radius: ${borderRadius};
    top: -${borderWidth};
    left: -${borderWidth};
    width: calc(100% + (${borderWidth} * 2));
    height: calc(100% + (${borderWidth} * 2));
    z-index: -1;

    transition: all 0.5s ease;
  }

  ${interactive &&
    css`
      &::before,
      &::after {
        opacity: 0.6;
      }

      &:hover {
        --computed-gradient-blur: calc(${blur} * 1.2);
        &::before,
        &::after {
          opacity: 1;
        }
      }

      &:active {
        --computed-gradient-blur: calc(${blur} * 0.6);
      }
    `}

  &::after {
    filter: blur(var(--computed-gradient-blur));
  }
`
