import * as React from 'react'
import { styled } from 'linaria/react'
import { CircleMargin } from './ProgressBar'

const StyledArtists = styled.h5`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  margin-bottom: 25px;

  @media (min-width: 800px) {
    margin-left: calc(7px + ${CircleMargin});
  }

  @media (max-width: 800px) {
    text-align: center;
  }
`

const Artist = styled.a`
  opacity: 0.6;
  color: inherit;
  transition: opacity 0.2s ease;
  text-decoration: none;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`

export const Artists = ({ artists }) => {
  return (
    <StyledArtists>
      {artists
        ? artists.map((artist, i) => {
            const lastItem = i === artists.length - 1

            return (
              <Artist key={artist.uri} href={artist.uri} target="_blank">
                {artist.name}
                {!lastItem && ', '}
              </Artist>
            )
          })
        : '...'}
    </StyledArtists>
  )
}
