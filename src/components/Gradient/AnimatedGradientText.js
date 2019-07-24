import { styled } from 'linaria/react'

export const AnimatedGradientText = styled.div`
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

  @supports (-webkit-background-clip: text) {
    background-image: linear-gradient(
      ${({ degrees }) => degrees}deg,
      ${({ colors }) => colors.join(',')}
    );

    background-size: ${({ gradientSize }) => gradientSize * 100}%;
    animation: animatedShadow ${({ duration }) => duration}ms linear infinite;
    color: transparent !important;
    background-clip: text;
    -webkit-background-clip: text;
  }
`

AnimatedGradientText.defaultProps = {
  degrees: 45,
  gradientSize: 4,
  duration: 10000,
}
