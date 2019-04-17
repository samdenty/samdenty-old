import './Layout.css'
import styled from '@emotion/styled'
import React, { useRef } from 'react'
import { Header } from '../Header'
import { useResizeObserver } from '../../hooks'

const StyledLayout = styled.div`
  @font-face {
    font-family: 'Gilroy';
    src: url(${require('../../assets/fonts/Gilroy-Medium.woff2')});
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${require('../../assets/fonts/Gilroy-SemiBold.woff2')});
    font-weight: bold;
  }
  * {
    font-family: Gilroy;
  }
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  color: #fff;
`

const Main = styled.main`
  display: flex;
  padding: 30px 70px;
  flex-direction: column;

  @media (max-width: 900px) {
    padding: 30px 50px;
  }
`

const Banner = styled.div`
  flex-shrink: 0;

  &:empty {
    height: 105px;
  }
`

export const Layout = ({ banner, ...props }) => {
  const bannerRef = useRef(null)
  const { height } = useResizeObserver(bannerRef)

  return (
    <StyledLayout>
      <Header fadeInAfter={height} shadow={!!banner} />
      <Banner ref={bannerRef}>{banner}</Banner>

      <Main {...props} />
      <footer />
    </StyledLayout>
  )
}
