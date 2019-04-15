import React from 'react'
import { Link } from 'gatsby'

import { Layout, SEO } from '../components'
import styled from '@emotion/styled'
import { animatedGradientBox } from '../utils'

const ScreenContainer = styled.div`
  ${animatedGradientBox({
    colors: [
      '#fb0094',
      '#0000ff',
      '#00ff00',
      '#ffff00',
      '#ff0000',
      '#fb0094',
      '#0000ff',
      '#00ff00',
      '#ffff00',
      '#ff0000',
    ],
    borderWidth: '3px',
    borderRadius: '5px',
    blur: '70px',
  })};

  transform: matrix3d(
    0.400828,
    -0.040668,
    0,
    -0.000183,
    0.006855,
    0.787678,
    0,
    0.000013,
    0,
    0,
    1,
    0,
    144,
    87.994995,
    0,
    1
  );
  transform-origin: 0px 0px 0px;
  width: 1080px;
  height: 420px;
  display: flex;

  @media (max-width: 1050px) {
    width: 80vw;
    height: 28vw;
  }
`

const Screen = styled.img`
  width: 100%;
  border-radius: 5px;
  background: linear-gradient(0deg, #000, #262626);
`

export default () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <ScreenContainer>
      <Screen src="https://i.imgur.com/LLYLATe.png" />
    </ScreenContainer>

    <Link to="/projects/">Projects</Link>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)
