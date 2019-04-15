import * as React from 'react'
import styled from '@emotion/styled'
import { animatedGradientBox } from '../../../utils'
import { Tag } from './Tag'

const StyledProject = styled.div`
  ${({ gradient }) =>
    animatedGradientBox({
      colors: gradient ? gradient : undefined,
      gradientSize: 5,
      duration: 30 * 1000,
      borderWidth: '3px',
      borderRadius: '5px',
      blur: '40px',
    })};

  display: flex;
  flex-direction: column;
  padding: 15px;
`

const Headline = styled.div`
  display: flex;
  height: 36px;
  align-items: center;
  padding-bottom: 6px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
`

const Logo = styled.img`
  height: 36px;
  margin-right: 10px;
`

const Tags = styled.div``

export const Project = ({
  title,
  logo,
  tags,
  onTagClick,
  gradient,
  start_date,
  end_date,
  languages,
  children,
}) => {
  return (
    <StyledProject gradient={gradient}>
      <Headline>
        {logo && <Logo src={logo} />}
        <Title>{title}</Title>
      </Headline>
      <div>languages:</div>
      from {start_date} to {end_date}
      {languages && languages.map(language => <div>{language}</div>)}
      <div>tags:</div>
      <Tags>
        {tags &&
          tags.map((tagName, i) => (
            <Tag onClick={() => onTagClick(tagName)} key={i}>
              {tagName}
            </Tag>
          ))}
      </Tags>
      {children}
    </StyledProject>
  )
}
