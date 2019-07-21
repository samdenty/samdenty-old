import React from 'react'
import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import { Link } from 'gatsby'
import { FaCalendarAlt } from 'react-icons/fa'
import Img from 'gatsby-image'

const StyledProjects = styled2(Link)`
  display: flex;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.2s ease;
  padding: 15px 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  .ais-Hits-item:last-child & {
    border: none;
  }

  &:hover {
    border-color: transparent;
    background-color: rgba(255, 255, 255, 0.2)
  }
`

const Header = styled.div`
  display: flex;
  line-height: 30px;
`

const Title = styled(Highlight)`
  font-size: 18px;
  flex-grow: 1;
`

const Date = styled.div`
  font-weight: bold;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
`

const DateIcon = styled(FaCalendarAlt)`
  margin-right: 5px;
`

const Excerpt = styled(Snippet)`
  margin-top: 10px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Logo = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`

export const Projects = ({ hit }) => {
  return (
    <StyledProjects to={hit.slug}>
      <Content>
        <Header>
          {hit.logo &&
            (typeof hit.logo === 'string' ? (
              <Logo src={hit.logo} />
            ) : (
              <Logo as={Img} fluid={hit.logo} />
            ))}
          <Title attribute="title" hit={hit} tagName="mark" />

          <Date>
            <DateIcon />
            {hit.start_date}
          </Date>
        </Header>
        {hit.excerpt.replace(/\r?\n|\r| /g, '') && (
          <Excerpt attribute="excerpt" hit={hit} tagName="mark" />
        )}
      </Content>
    </StyledProjects>
  )
}
