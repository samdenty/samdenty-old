import * as React from 'react'
import ChromeIcon from './ChromeIcon.svg'
import styled from '@emotion/styled'
import { App } from '../../OSX'

const StyledChrome = styled.div``

export const Chrome = () => {
  return (
    <App title="Google Chrome" icon={<ChromeIcon />}>
      <StyledChrome>Google chrome</StyledChrome>
    </App>
  )
}
