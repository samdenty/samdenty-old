import './Layout.css'
import styled from '@emotion/styled'
import React from 'react'
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
  margin-top: 105px;
  padding: 30px 70px;
  flex-direction: column;

  @media (max-width: 900px) {
    padding: 30px 50px;
  }
`

export const Layout = ({ children }) => (
  <StyledLayout>
    <Header />

    <Main>{children}</Main>
    <footer />
  </StyledLayout>
)
