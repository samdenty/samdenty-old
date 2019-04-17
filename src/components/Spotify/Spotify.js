import * as React from 'react'
import { usePlayer } from './usePlayer'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { ProgressBar } from './ProgressBar'
import { animatedGradientBox, colourful } from '../../utils'
import { Artists } from './Artists'
import { Tick } from './Tick'

const StyledSpotify = styled.div`
  display: flex;
  align-items: center;
`

const Circle = styled.div`
  ${animatedGradientBox({
    colors: colourful,
    borderWidth: '7px',
    duration: 60 * 1000,
  })}
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
  margin-left: 40px;
  width: 500px;
`

const SongName = styled.h4`
  display: flex;
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
`

export const Spotify = () => {
  const player = usePlayer()
  if (!player) return null

  console.log(player)

  return (
    <StyledSpotify>
      <Circle>
        <AlbumArt src={player.item.album.images[0].url} />
      </Circle>

      <Details>
        <SongName>
          {player.item.name}
          <Tick
            css={css`
              color: ${player.item.saved
                ? 'green'
                : 'rgba(255, 255, 255, 0.8)'};
            `}
          />
        </SongName>
        <Artists artists={player.item.artists} />

        <ProgressBar
          playing={player.is_playing}
          progress={player.progress_ms}
          duration={player.item.duration_ms}
        />
      </Details>
    </StyledSpotify>
  )
}
