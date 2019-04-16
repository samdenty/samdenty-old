import * as React from 'react'
import styled from '@emotion/styled'
import { animatedGradientBox, animatedGradient } from '../../../utils'
import { Tag } from './Tag'
import { Link } from 'gatsby'
import moment from 'moment'
import { GitHub } from './GitHub'

const StyledProject = styled.article`
  ${({ gradient }) =>
    animatedGradientBox({
      colors: gradient ? gradient : undefined,
      gradientSize: 5,
      duration: 30 * 1000,
      borderWidth: '1px',
      borderRadius: '5px',
      blur: '20px',
    })};

  display: flex;
  flex-direction: column;
`

const SlugLink = styled(Link)`
  display: contents;
  color: inherit;
  text-decoration: none;
`

const Headline = styled.div`
  display: flex;
  height: 60px;
  position: relative;
  align-items: center;
  padding-bottom: 6px;
  margin-bottom: 15px;
  overflow: hidden;
  padding: 12px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
  flex-grow: 1;

  ${SlugLink}:hover & {
    text-decoration: underline;
  }
`

const Logo = styled.img`
  height: 36px;
  margin-right: 10px;
`

const Footer = styled.div`
  margin-bottom: 10px;
  padding: 0 10px;
`

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

const Excerpt = styled.p`
  margin: 0;
  margin-bottom: 15px;
  flex-grow: 1;
  padding: 0 15px;
`

const Period = styled.div`
  font-weight: bold;
  padding: 0 15px;
  margin-bottom: 5px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
`

export const Project = ({
  title,
  logo,
  tags,
  onTagClick,
  gradient,
  slug,
  github,
  featured,
  start_date,
  end_date,
  children,
}) => {
  const format = featured ? 'YYYY/MM/DD' : 'YYYY'

  const from = moment(start_date).format(format)
  const until = end_date && moment(end_date).format(format)

  const string = !until || from === until ? from : `${from} - ${until}`

  return (
    <StyledProject gradient={gradient}>
      <SlugLink to={slug}>
        <Headline>
          {logo && <Logo src={logo} />}
          <Title>{title}</Title>
          {featured && <Featured>Featured</Featured>}
        </Headline>

        <Excerpt>{children}</Excerpt>
        <Period>{string}</Period>
      </SlugLink>

      <Footer>
        {github && (
          <a href={`https://github.com/${github}`} target="_blank">
            <GitHub />
          </a>
        )}
        {tags &&
          tags.map((tag, i) => (
            <Tag onClick={() => onTagClick(tag)} key={i}>
              {tag.label}
            </Tag>
          ))}
      </Footer>
    </StyledProject>
  )
}
