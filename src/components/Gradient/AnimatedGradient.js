import styled from '@emotion/styled'

export const AnimatedGradient = styled.div`
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

  background-image: linear-gradient(
    ${({ degrees }) => degrees}deg,
    ${({ colors }) => colors.join(',')}
  );

  background-size: ${({ gradientSize }) => gradientSize * 100}%;
  animation: animatedShadow ${({ duration }) => duration}ms linear infinite;
`

AnimatedGradient.defaultProps = {
  degrees: 45,
  gradientSize: 4,
  duration: 10000,
}
