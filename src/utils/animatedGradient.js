import { orangePurple } from './colors'
import css from '@emotion/css'

export const gradient = ({ colors = orangePurple, degrees = 45 } = {}) => {
  if (colors.length === 1) colors = [colors[0], colors[0]]

  return css`
    background-image: linear-gradient(${degrees}deg, ${colors.join(',')});
  `
}

export const animatedGradient = ({
  colors,
  degrees,
  duration = 10000,
  gradientSize = 4,
} = {}) => {
  return css`
    @keyframes animatedShadow {
      from {
        background-position: 0 0;
      }
      50% {
        background-position: 100% 0;
      }
      to {
        background-position: 0 0;
      }
    }

    ${gradient({ colors, degrees })}
    background-size: ${gradientSize * 100}%;
    animation: animatedShadow ${duration}ms linear infinite;
  `
}
