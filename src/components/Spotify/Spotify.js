import * as React from 'react'
import { usePlayer } from './usePlayer'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { ProgressBar } from './ProgressBar'
import { animatedGradientBox, colourful } from '../../utils'
import { Artists } from './Artists'
import { Tick } from './Tick'

const StyledSpotify = styled.div`
  width: 900px;
  max-width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

export const CircleMargin = '25px'

const Circle = styled.div`
  ${animatedGradientBox({
    colors: colourful,
    borderWidth: '7px',
    duration: 60 * 1000,
  })}
  flex-shrink: 0;
  border-radius: 50%;
  height: 220px;
  width: 220px;
`

const AlbumArt = styled.img`
  display: flex;
  align-items: center;
  object-fit: cover;
  border-radius: inherit;
  position: absolute;
  top: 0;
  left: 0;
  width: auto;
  height: 100%;
`

const Details = styled.div`
  width: 100%;

  @media (max-width: 800px) {
    margin-top: 40px;
    flex-direction: column;
    justify-content: center;
  }
`

const SongName = styled.h4`
  display: flex;
  justify-content: inherit;
  align-items: center;
  font-size: 2rem;
  margin: 0;
  margin-bottom: 10px;

  svg {
    height: 1em;
    width: 1em;
    margin-left: 10px;
    padding: 5px;
  }

  @media (min-width: 800px) {
    margin-left: calc(-6px + ${CircleMargin});
  }
`

const SongLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const Spotify = () => {
  const player = usePlayer()

  return (
    <StyledSpotify>
      <Circle>
        {player && <AlbumArt src={player.item.album.images[0].url} />}
      </Circle>

      <Details>
        <SongName>
          {player ? (
            <SongLink href={player.item.uri} target="_blank">
              {player.item.name}
            </SongLink>
          ) : (
            'Loading'
          )}
          <Tick
            css={css`
              color: ${player && player.item.saved
                ? '#0fb70f'
                : 'rgba(255, 255, 255, 0.5)'};
            `}
          />
        </SongName>
        <Artists artists={player && player.item.artists} />

        <ProgressBar
          playing={player && player.is_playing}
          progress={player ? player.progress_ms : 0}
          duration={player ? player.item.duration_ms : 0}
        />
      </Details>
    </StyledSpotify>
  )
}
