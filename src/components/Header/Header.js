import * as React from 'react'
import styled from '@emotion/styled'
import { Logo } from './Logo'
import { animatedGradientBox } from '../../utils'
import { useResizeObserver } from '../../hooks'
import { Navigation } from './Navigation'

const StyledHeader = styled.header`
  font-family: Gilroy;

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
        opacity: ${({ showBackground }) => (showBackground ? 0.6 : 0)};
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
    borderRadius: '0',
  })}

  position: fixed;
  width: 100%;
  padding: 20px 30px;
  z-index: 999;
`

const shadowBlur = 100
const HeaderShadow = styled.div`
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
    borderRadius: '0',
  })}

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

const Items = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Spacer = styled.div`
  width: 30%;
`

export const Header = ({ mainRef, shadow }) => {
  const [showBackground, setShowBackground] = React.useState(false)
  const headerRef = React.useRef(null)
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

  return (
    <StyledHeader showBackground={showBackground} ref={headerRef}>
      {shadow && !showBackground && <HeaderShadow />}
      <Items>
        <Logo />
        <Spacer />
        <Navigation />
      </Items>
    </StyledHeader>
  )
}
