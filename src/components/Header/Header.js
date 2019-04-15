import * as React from 'react'
import styled from '@emotion/styled'
import { MediumButton } from '../Button'
import { Logo } from './Logo'
import { animatedGradientBox } from '../../utils'

const StyledHeader = styled.div`
  &::after,
  &::before {
    transition: opacity 0.2s ease;
    opacity: ${({ showBackground }) => (showBackground ? 1 : 0)};
  }

  @supports (backdrop-filter: blur(10px)) {
    @media (min-width: 900px) {
      backdrop-filter: ${({ showBackground }) =>
        showBackground && `blur(30px)`};

      &::after,
      &::before {
        opacity: ${({ showBackground }) => (showBackground ? 0.7 : 0)};
      }
    }
  }

  ${animatedGradientBox({
    colors: [
      'rgba(0, 0, 0, 0.8)',
      'rgba(0, 0, 0, 0.7)',
      'rgba(0, 0, 0, 0.8)',
      'rgba(0, 0, 0, 0.7)',
      'rgba(0, 0, 0, 0.7)',
    ],
    blur: '10px',
    borderRadius: '0',
  })}

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  padding: 20px 0;
  z-index: 999;
`

export const Spacer = styled.div`
  width: 30%;
`

export const Header = () => {
  const [showBackground, setShowBackground] = React.useState(false)
  const headerRef = React.useRef(null)

  React.useEffect(() => {
    const listener = () => {
      const rect = headerRef.current.getBoundingClientRect()
      setShowBackground(document.documentElement.scrollTop >= rect.height)
    }
    window.addEventListener('scroll', listener)
    listener()

    return () => window.removeEventListener('scroll', listener)
  }, [])

  return (
    <StyledHeader showBackground={showBackground} ref={headerRef}>
      <Logo />
      <Spacer />
      <MediumButton>Login</MediumButton>
    </StyledHeader>
  )
}
