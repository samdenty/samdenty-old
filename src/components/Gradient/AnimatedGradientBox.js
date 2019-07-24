import { styled } from 'linaria/react'

export const AnimatedGradientBox = styled.div`
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

  --computed-gradient-blur: ${({ blur }) => blur};

  z-index: 1;
  border-radius: 5px;
  position: relative;

  &::before,
  &::after {
    background-image: linear-gradient(
      ${({ degrees }) => degrees}deg,
      ${({ colors }) => colors.join(',')}
    );

    background-size: ${({ gradientSize }) => gradientSize * 100}%;
    animation: animatedShadow ${({ duration }) => duration}ms linear infinite;

    content: '';
    position: absolute;
    border-radius: inherit;
    top: -${({ borderWidth }) => borderWidth};
    left: -${({ borderWidth }) => borderWidth};
    width: calc(100% + (${({ borderWidth }) => borderWidth} * 2));
    height: calc(100% + (${({ borderWidth }) => borderWidth} * 2));
    z-index: -1;

    transition: all 0.5s ease;
  }

  &::after {
    filter: blur(var(--computed-gradient-blur));
  }
`

AnimatedGradientBox.defaultProps = {
  degrees: 45,
  gradientSize: 4,
  duration: 10000,
  borderWidth: '2px',
  blur: '9px',
}

export const InteractiveGradientBox = styled(AnimatedGradientBox)`
  &::before,
  &::after {
    opacity: 0.6;
  }

  &:hover {
    --computed-gradient-blur: calc(${({ blur }) => blur} * 1.2);
    &::before,
    &::after {
      opacity: 1;
    }
  }

  &:active {
    --computed-gradient-blur: calc(${({ blur }) => blur} * 0.6);
    &::before,
    &::after {
      opacity: 1;
    }
  }
`
