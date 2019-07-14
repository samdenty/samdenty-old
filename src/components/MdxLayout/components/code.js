import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import { animatedGradientBox } from '../../../utils'

export const pre = styled2.pre`
  overflow: initial !important;
  margin: 25px 0 !important;

  ${animatedGradientBox({
    colors: ['#1a0631', '#0D090F'],
  })}

  &::after {
    opacity: 0.4;
  }
`

export const code = styled.code`
  font-family: 'Operator mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
    monospace !important;
  font-size: 18px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  padding: 3px 5px;
  color: rgba(0, 0, 0, 0.84);
  line-height: 1.5;
  display: initial;
`
