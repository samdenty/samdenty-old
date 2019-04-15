import * as React from 'react'
import styled from '@emotion/styled'
import { animatedGradientBox } from '../../utils'

const StyledProject = styled.div`
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

  display: flex;
  flex-direction: column;
  padding: 15px;
`

const Title = styled.h2`
  margin: 0;
`

export const Project = ({
  title,
  tags,
  start_date,
  end_date,
  languages,
  children,
}) => {
  return (
    <StyledProject>
      <Title>{title}</Title>
      <div>languages:</div>
      from {start_date} to {end_date}
      {languages && languages.map(language => <div>{language}</div>)}
      <div>tags:</div>
      {tags && tags.map(tag => <div>{tag}</div>)}
      {children}
    </StyledProject>
  )
}
