import './Layout.css'
import styled from '@emotion/styled'
import React from 'react'
import { Header } from '../Header'
import { BackgroundEffect } from './BackgroundEffect'

const StyledLayout = styled.div`
  @font-face {
    font-family: 'Gilroy';
    src: url(${require('../../assets/fonts/Gilroy-Medium.woff2')});
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
  padding: 30px;
  flex-direction: column;
`

export const Layout = ({ children }) => (
  <StyledLayout>
    <BackgroundEffect />
    <Header />

    <Main>{children}</Main>
    <footer />
  </StyledLayout>
)
