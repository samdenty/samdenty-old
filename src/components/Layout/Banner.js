import * as React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'
import styled from '@emotion/styled'

const StyledBanner = styled(ParallaxBanner)`
  height: 70vh;
  overflow: hidden;
  min-height: 500px;
  max-height: 640px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

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

export const Banner = ({ amount = 0.5, content, ...props }) => {
  return (
    <StyledBanner
      layers={[
        {
          amount,
          children: content,
        },
      ]}
      {...props}
    />
  )
}
