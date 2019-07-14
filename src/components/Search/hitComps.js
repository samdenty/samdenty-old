import React, { Fragment } from 'react'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import { Link } from 'gatsby'
import { FaTags } from 'react-icons/fa'
import { GoCalendar } from 'react-icons/go'

export const PageHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={hit.slug} onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

export const ProjectHit = clickHandler => ({ hit }) => {
  return (
    <div>
      <Link to={hit.slug} onClick={clickHandler}>
        <h4>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
      </Link>
      <div>
        <GoCalendar size="1em" />
        &nbsp;
        <Highlight attribute="start_date" hit={hit} tagName="mark" />
        &emsp;
        <FaTags size="1em" />
        &nbsp;
        {/*hit.tags.map((tag, index) => (
          <Fragment key={tag}>
            {index > 0 && `, `}
            {tag}
          </Fragment>
        ))*/}
      </div>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
  )
}
