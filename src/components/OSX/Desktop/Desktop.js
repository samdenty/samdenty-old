import * as React from 'react'
import { styled } from 'linaria/react'
import { DockBar } from './DockBar'
import { MenuBar } from './MenuBar'
import { Content } from './Content'
import { WindowManager } from './WindowManager'
import { motion } from 'framer-motion'

const StyledDesktop = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: url(https://cnet2.cbsistatic.com/img/-qvJVYfnJOTphXGOc2fzSNnwQPk=/1600x900/2018/06/07/78e06ce4-81e0-4b35-992f-6a2b3585b931/mojave-night.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`

export const Desktop = ({ children, ...props }) => {
  return (
    <StyledDesktop {...props}>
      <MenuBar />
      <Content>
        <WindowManager />
      </Content>

      <DockBar />
      {children}
    </StyledDesktop>
  )
}
