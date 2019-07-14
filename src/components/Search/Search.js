import React, { useState, useEffect, createRef, useMemo, useRef } from 'react'
import {
  InstantSearch,
  Index,
  Hits,
  connectSearchBox,
  connectStateResults,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

import { Root, HitsWrapper, PoweredBy } from './styles'
import Input from './Input'
import * as hitComps from './hitComps'

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = event =>
    !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}

export const useSearch = value => {
  const [focus, setFocus] = useState(false)
  const [query, setQuery] = useState(value)

  const listeners = useMemo(() => new Set(), [])

  const search = {
    query,
    focus,
    setFocus,
    setQuery(value) {
      listeners.forEach(propagate => propagate(value))
      setQuery(value)
    },
    onQuery(listener) {
      listeners.add(listener)
    },

    inputProps: {
      value: query,
      onChange: ({ target }) => search.setQuery(target.value),
      onFocus: () => setFocus(true),
      focus,
    },
  }
  return search
}

const Refine = connectSearchBox(({ onQuery, refine }) => {
  useEffect(() => {
    onQuery(refine)
  }, [])

  return null
})

export const Search = ({ indices, search }) => {
  const ref = useRef()

  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  useClickOutside(ref, () => search.setFocus(false))

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      root={{ Root, props: { ref } }}
    >
      <Refine onQuery={search.onQuery} />
      <HitsWrapper show={search.query.length > 0 && search.focus}>
        {indices.map(({ name, title, hitComp }) => (
          <Index key={name} indexName={name}>
            <header>
              <h3>{title}</h3>
              <Stats />
            </header>
            <Results>
              <Hits
                hitComponent={hitComps[hitComp](() => search.setFocus(false))}
              />
            </Results>
          </Index>
        ))}
        <PoweredBy />
      </HitsWrapper>
    </InstantSearch>
  )
}
