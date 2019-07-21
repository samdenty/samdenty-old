import * as React from 'react'
import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import { Logo } from './Logo'
import { animatedGradientBox } from '../../utils'
import { useResizeObserver } from '../../hooks'
import { Navigation } from './Navigation'
import useWindowSize from 'react-use/lib/useWindowSize'
import { Drawer } from './Drawer'
import { useState } from 'react'

const StyledHeader = styled2.header`
  font-family: Gilroy;
  display: flex;

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
        opacity: ${({ showBackground }) => (showBackground ? 0.8 : 0)};
      }
    }
  }

  ${animatedGradientBox({
    colors: [
      'rgba(11, 1, 19, 0.8)',
      'rgba(11, 1, 19, 0.7)',
      'rgba(11, 1, 19, 0.8)',
      'rgba(11, 1, 19, 0.7)',
      'rgba(11, 1, 19, 0.7)',
    ],
    blur: '10px',
  })}
  border-radius: 0;

  position: fixed;
  width: 100%;
  padding: 20px;
  z-index: 999;
`

const shadowBlur = 100
const HeaderShadow = styled2.div`
  ${animatedGradientBox({
    colors: [
      'rgba(11, 1, 19, 0.8)',
      'rgba(11, 1, 19, 0.8)',
      'rgba(11, 1, 19, 1.0)',
      'rgba(11, 1, 19, 0.8)',
      'rgba(11, 1, 19, 0.8)',
    ],
    blur: `${shadowBlur}px`,
    degrees: 45,
    duration: 30 * 1000,
  })}
  border-radius: 0;

  &::before {
    display: none;
  }

  top: 0;
  left: 0;
  position: absolute;
  margin-left: -${shadowBlur + 20}px;
  width: calc(100% + (${shadowBlur + 20}px * 2));
  z-index: -1;
  height: calc(100% + 100px);
  margin-top: -110px;
`

const Items = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

const Spacer = styled.div`
  width: 30%;
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

const useShowDrawer = () => {
  const { width } = useWindowSize()

  return width <= 950
}

export const Header = ({ mainRef, shadow }) => {
  const headerRef = React.useRef(null)
  const showBackground = useShowHeaderBackground(headerRef, mainRef)
  const showDrawer = useShowDrawer()

  return (
    <StyledHeader showBackground={showBackground} ref={headerRef}>
      {shadow && !showBackground && <HeaderShadow />}
      {showDrawer && <Drawer />}

      <Items>
        <Logo />

        {!showDrawer && (
          <>
            <Spacer />
            <Navigation />
          </>
        )}
      </Items>
    </StyledHeader>
  )
}
