import * as React from 'react'
import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import { Logo } from './Logo'
import { animatedGradientBox } from '../../utils'
import { useResizeObserver } from '../../hooks'
import { Navigation } from './Navigation'
import { Drawer } from './Drawer'
import { transparentize, darken } from 'polished'
import { withTheme } from '../../theme'

const StyledHeader = withTheme(styled.header`
  font-family: Gilroy;
  display: flex;
  transition: background-color 0.2s ease;
  background-color: ${({ theme, showBackground }) =>
    showBackground ? theme.headerBackground : 'transparent'};

  box-shadow: ${({ theme, showBackground }) =>
    showBackground
      ? `0 10px 20px ${darken(
          0.05,
          transparentize(0.81, theme.headerBackground)
        )}, 0 6px 6px ${darken(
          0.05,
          transparentize(0.77, theme.headerBackground)
        )}`
      : 'none'};

  border-radius: 0;
  position: fixed;
  width: 100%;
  padding: 20px;
  z-index: 999;

  @supports (backdrop-filter: blur(10px)) {
    @media (min-width: 900px) {
      backdrop-filter: ${({ showBackground }) =>
        showBackground ? 'blur(30px)' : 'none'};

      background-color: ${({ theme, showBackground }) =>
        showBackground
          ? transparentize(0.2, theme.headerBackground)
          : 'transparent'};
      }
    }
  }
`)

const HeaderShadow = withTheme(styled.div`
  top: 0;
  pointer-events: none;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: -1;
  height: calc(100% + 200px);
  box-shadow: inset 0 250px 150px -150px ${({ theme }) => darken(0.05, transparentize(0.4, theme.headerBackground))};
`)

const Items = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

const Spacer = styled.div`
  width: 30%;

  @media (max-width: 950px) {
    display: none;
  }
`

const useShowHeaderBackground = (headerRef, mainRef) => {
  const [showBackground, setShowBackground] = React.useState(false)

  const { height } = useResizeObserver(headerRef)
  const { top } = useResizeObserver(mainRef)

  let triggerAmount = top - height
  if (triggerAmount < height) triggerAmount = height

  React.useEffect(() => {
    const listener = () => {
      setShowBackground(document.documentElement.scrollTop >= triggerAmount)
    }
    window.addEventListener('scroll', listener)
    listener()

    return () => window.removeEventListener('scroll', listener)
  }, [triggerAmount])

  return showBackground
}

export const Header = ({ mainRef, shadow }) => {
  const headerRef = React.useRef(null)
  const showBackground = useShowHeaderBackground(headerRef, mainRef)

  return (
    <StyledHeader showBackground={showBackground} ref={headerRef}>
      {shadow && !showBackground && <HeaderShadow />}
      <Drawer />

      <Items>
        <Logo />
        <Spacer />
        <Navigation />
      </Items>
    </StyledHeader>
  )
}
