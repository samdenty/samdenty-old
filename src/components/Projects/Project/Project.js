import * as React from 'react'
import styled from '@emotion/styled'
import Moment from 'react-moment'
import { animatedGradientBox, animatedGradient } from '../../../utils'
import { Tag } from './Tag'
import { Link } from 'gatsby'

const StyledProject = styled.div`
  ${({ gradient }) =>
    animatedGradientBox({
      colors: gradient ? gradient : undefined,
      gradientSize: 5,
      duration: 30 * 1000,
      borderWidth: '1px',
      borderRadius: '5px',
      blur: '40px',
    })};

  display: flex;
  flex-direction: column;
`

const Headline = styled(Link)`
  display: flex;
  color: inherit;
  position: relative;
  text-decoration: none;
  height: 36px;
  align-items: center;
  padding-bottom: 6px;
  margin-bottom: 10px;
  overflow: hidden;
  padding: 12px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const Title = styled.h2`
  margin: 0;
  font-size: 22px;

  ${Headline}:hover & {
    text-decoration: underline;
  }
`

const Logo = styled.img`
  height: 36px;
  margin-right: 10px;
`

const Tags = styled.div``

const Featured = styled.div`
  ${animatedGradient({
    colors: [
      'rgba(255, 255, 255, 0.13)',
      'rgba(255, 255, 255, 0.1)',
      'rgba(255, 255, 255, 0.35)',
      'rgba(255, 255, 255, 0.1)',
      'rgba(255, 255, 255, 0.13)',
    ],
    duration: 5 * 1000,
  })}
  position: absolute;
  transform: rotate(45deg);
  padding: 0 20px;
  font-size: 12px;
  top: 19px;
  right: -21px;
`

const Content = styled.div`
  padding: 0 15px;
`

export const Project = ({
  title,
  logo,
  tags,
  onTagClick,
  gradient,
  slug,
  featured,
  start_date,
  end_date,
  children,
}) => {
  return (
    <StyledProject gradient={gradient}>
      <Headline to={slug}>
        {logo && <Logo src={logo} />}
        <Title>{title}</Title>
        {featured && <Featured>Featured</Featured>}
      </Headline>

      <Content>
        <p>{children}</p>

        <Moment format="YYYY/MM/DD">{start_date}</Moment>
        {end_date ? (
          <>
            -<Moment format="YYYY/MM/DD">{end_date}</Moment>
          </>
        ) : null}

        <Tags>
          {tags &&
            tags.map((tag, i) => (
              <Tag onClick={() => onTagClick(tag)} key={i}>
                {tag.label}
              </Tag>
            ))}
        </Tags>
      </Content>
    </StyledProject>
  )
}
