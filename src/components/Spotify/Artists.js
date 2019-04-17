import * as React from 'react'
import styled from '@emotion/styled'
import { CircleMargin } from './Spotify'

const StyledArtists = styled.h5`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  margin-bottom: 25px;
  margin-left: calc(7px + ${() => CircleMargin});
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
      {artists.map((artist, i) => {
        const lastItem = i === artists.length - 1

        return (
          <Artist key={artist.uri} href={artist.uri} target="_blank">
            {artist.name}
            {!lastItem && ', '}
          </Artist>
        )
      })}
    </StyledArtists>
  )
}
