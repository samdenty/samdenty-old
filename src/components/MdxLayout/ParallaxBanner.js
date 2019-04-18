import * as React from 'react'
import * as RSP from 'react-scroll-parallax'
import styled from '@emotion/styled'
import { animatedGradient } from '../../utils'

const StyledParallaxBanner = styled(RSP.ParallaxBanner)`
  position: absolute !important;
  z-index: -1;
  overflow: hidden;
  height: 70vh !important;
  min-height: 500px;
  max-height: 666px;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${({ gradient }) =>
      animatedGradient({
        colors: gradient || undefined,
        gradientSize: 5,
        duration: 40 * 1000,
      })};
    opacity: 0.6;
  }

  .parallax-outer {
    z-index: -1;
  }

  .parallax-inner img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .gatsby-image-wrapper {
    height: 100%;
    width: 100%;
  }
`

const BannerContent = styled.div`
  height: 500px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export const ParallaxBanner = ({
  amount = 0.5,
  background,
  className,
  children,
  ...props
}) => {
  return (
    <>
      <StyledParallaxBanner
        layers={[
          {
            amount,
            children: background,
          },
        ]}
        {...props}
      >
        <div>test</div>
      </StyledParallaxBanner>
      <BannerContent>{children}</BannerContent>
    </>
  )
}
