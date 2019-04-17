import { useEffect, useState } from 'react'

const gql = String.raw
const query = gql`
  query Player {
    me {
      player {
        progress_ms
        is_playing
        item {
          saved
          artists {
            name
            uri
          }
          album {
            images {
              height
              url
              width
            }
          }
          uri
          duration_ms
          name
        }
      }
    }
  }
`

export const usePlayer = () => {
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    const updateResults = async () => {
      try {
        var { data } = await (await fetch('/.netlify/functions/spotify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        })).json()

        if (!data) return
      } catch (e) {
        return
      }

      const newPlayer = data.me.player
      newPlayer.progress_ms = +newPlayer.progress_ms
      newPlayer.item.duration_ms = +newPlayer.item.duration_ms

      if (JSON.stringify(player) !== JSON.stringify(newPlayer)) {
        setPlayer(data.me.player)
      }
    }

    const timer = setInterval(updateResults, 5000)
    updateResults()

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!player) return

    const INTERVAL = 1000

    const timer = setInterval(() => {
      if (player.is_playing) {
        let progress_ms = player.progress_ms + INTERVAL
        if (progress_ms > player.item.duration_ms)
          progress_ms = player.item.duration_ms

        setPlayer({
          ...player,
          progress_ms,
        })
      }
    }, INTERVAL)

    return () => clearInterval(timer)
  }, [player])

  return player
}
