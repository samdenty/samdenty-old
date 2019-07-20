import React, { useState, useEffect, createRef, useMemo, useRef } from 'react'
import {
  InstantSearch,
  Index,
  Hits,
  connectSearchBox,
  connectStateResults,
} from 'react-instantsearch-dom'
import { styled } from 'linaria/react'
import useClickAway from 'react-use/lib/useClickAway'
import algoliasearch from 'algoliasearch/lite'
import * as hits from './hits'
import { motion, AnimatePresence } from 'framer-motion'

const StyledSearch = styled(motion.div)`
  .ais-Hits-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .ais-Hits {
    display: contents;
  }

  mark {
    background-color: rgba(255, 255, 0, 0.9);
  }
`

const NoResults = styled.div`
  padding: 5px 25px;
  font-weight: bold;
  opacity: 0.8;
`

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? (
      children
    ) : (
      <NoResults>No results for '{state.query}'</NoResults>
    )
)

const Refine = connectSearchBox(({ onQuery, refine }) => {
  useEffect(() => {
    onQuery(refine)
  }, [])

  return null
})

const StyledCount = styled.span`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  font-size: 15px;
  padding: 0 8px;
`

const Count = connectStateResults(({ searchResults: res }) =>
  res && res.nbHits > 0 ? (
    <StyledCount>
      {res.nbHits} result{res.nbHits > 1 ? `s` : ``}
    </StyledCount>
  ) : null
)

const IndiceHeader = styled.header`
  display: flex;
  line-height: 22px;
  margin-bottom: 20px;
  padding: 0 25px;
`

const IndiceName = styled.h4`
  flex-grow: 1;
  font-size: 22px;
  margin: 0;
`

export const Search = ({ search, ...props }) => {
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  useClickAway(search.ref, () => search.setFocus(false))

  return (
    <InstantSearch searchClient={searchClient} indexName={Object.keys(hits)[0]}>
      <Refine onQuery={search.onQuery} />

      {search.query && (
        <AnimatePresence>
          {search.focus && (
            <StyledSearch
              key="search"
              {...props}
              ref={search.ref}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Object.entries(hits).map(([name, Hit]) => (
                <Index key={name} indexName={name}>
                  <IndiceHeader>
                    <IndiceName>{name}</IndiceName>
                    <Count />
                  </IndiceHeader>
                  <Results>
                    <Hits hitComponent={Hit} />
                  </Results>
                </Index>
              ))}
            </StyledSearch>
          )}
        </AnimatePresence>
      )}
    </InstantSearch>
  )
}
