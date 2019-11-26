import React, { useState } from 'react'
import { get } from 'lodash'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Flex, Box } from '@grid'
import colors from '@features/_ui/colors'
import { convertSecondsToMinutes } from '@features/player/utilities'
import { inject } from '@lib/store'

function SongListItem({ queue, data, track, playerStore }) {
  const { nowPlaying } = playerStore
  const { url, playing } = nowPlaying
  const [hover, setHover] = useState(false)
  const isPlay = url === track.previewUrl

  function playButton(hover) {
    let icon = 'music'
    if (hover) {
      if (isPlay) {
        return !playing ? (icon = 'play') : (icon = 'pause')
      }
      icon = 'play'
    }
    return icon
  }

  if (track.previewUrl === null) {
    return null
  }

  return (
    <Box
      width={1}
      css={{
        '&:hover': {
          background: colors.background.light,
        },
      }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}>
      <Flex
        flexWrap="wrap"
        css={{
          padding: '8px 20px',
        }}>
        <Box css={{ padding: '5px', alignSelf: 'center' }}>
          <button
            css={{
              backgroundColor: 'transparent',
              border: 'none',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
            }}
            onClick={() => {
              !queue && playerStore.addQueueTracks(track)
              isPlay
                ? playerStore.pressButton()
                : playerStore.play({ ...data, ...track })
            }}>
            <Icon
              icon={playButton(hover)}
              css={{
                color: colors.link,
              }}
            />
          </button>
        </Box>
        <Box
          css={{
            flex: 1,
            padding: '5px',
          }}>
          <Flex
            flexWrap="wrap"
            css={{
              padding: '0px 20px 0px 0px',
            }}>
            <Box
              width={1}
              css={{
                color: isPlay ? colors.primary : colors.link,
              }}>
              {track.name}
            </Box>
            <Box width={1} css={{ fontSize: '0.9em', paddingTop: '10px' }}>
              {get(track, 'artists[0].name', '')} • {track.name}
            </Box>
          </Flex>
        </Box>
        <Box
          css={{
            padding: '0px 10px',
            fontSize: '0.85em',
            color: colors.link,
          }}>
          <button
            css={{
              backgroundColor: 'transparent',
              border: 'none',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
            }}
            onClick={() => playerStore.multiQueueTracks(track)}>
            <Icon
              icon="plus-circle"
              css={{
                color: colors.link,
              }}
            />
          </button>
        </Box>
        <Box
          css={{
            paddingTop: '5px',
            fontSize: '0.85em',
          }}>
          {convertSecondsToMinutes(track.durationMs / 1000)}
        </Box>
      </Flex>
    </Box>
  )
}

export default inject('playerStore')(SongListItem)
