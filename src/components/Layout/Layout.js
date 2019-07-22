import './Layout.css'
import { styled } from 'linaria/react'
import React, { useRef } from 'react'
import { Header } from '../Header'

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

  @font-face {
    font-family: 'Operator Mono';
    src: url(${require('../../assets/fonts/OperatorMono.otf')});
  }

  @font-face {
    font-family: 'Operator Mono';
    src: url(${require('../../assets/fonts/OperatorMono-Italic.otf')});
    font-style: italic;
  }

  @font-face {
    font-family: 'Operator Mono';
    src: url(${require('../../assets/fonts/OperatorMono-Medium.otf')});
    font-weight: bold;
  }

  @font-face {
    font-family: 'Operator Mono';
    src: url(${require('../../assets/fonts/OperatorMono-MediumItalic.otf')});
    font-weight: bold;
    font-style: italic;
  }

  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', sans-serif;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  color: #fff;
`

const Main = styled.main`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 30px 70px;
  flex-direction: column;
  margin-top: ${({ withBanner }) => (withBanner ? 0 : 105)}px;

  @media (max-width: 900px) {
    padding: 30px 50px;
  }
`

export const Layout = ({ banner, ...props }) => {
  const mainRef = useRef(null)

  return (
    <StyledLayout>
      <Header mainRef={mainRef} shadow={!!banner} />
      {banner}

      <Main withBanner={!!banner} {...props} ref={mainRef} />
      <footer />
    </StyledLayout>
  )
}
