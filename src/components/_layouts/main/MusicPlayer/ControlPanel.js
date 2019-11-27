import React from 'react'
import { Flex, Box } from '@grid'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import colors from '@features/_ui/colors'
import { add, minus } from '../../../../util/calculate'
import { inject } from '@lib/store'

function ButtonControl({
  step = false,
  icon,
  circle = false,
  active = false,
  onClick,
}) {
  const css = {
    background: 'transparent',
    padding: '7px 8px 11px 10px',
    margin: '0 10px',
    width: '34px',
    height: '34px',
    cursor: 'pointer',
    ...(circle === true
      ? { border: `1px solid ${colors.link}`, borderRadius: '50%' }
      : { border: 'none' }),
  }

  return (
    <button onClick={onClick} css={css}>
      {step ? (
        <Icon
          icon={icon}
          css={{
            color: !active ? colors.gray : colors.link,
            width: '10px',
          }}
        />
      ) : (
        <Icon
          icon={icon}
          css={{
            color: active ? 'green' : colors.link,
            width: '10px',
          }}
        />
      )}
    </button>
  )
}

function ControlPanel({ playerStore }) {
  const { controlPanel, nowPlaying, prefixTracks } = playerStore
  const { url } = nowPlaying
  const { redo, shuffle, backward } = controlPanel

  function Step(value, func) {
    const nowPlay = playerStore[prefixTracks].findIndex(
      d => d.previewUrl === url,
    )
    return playerStore[prefixTracks][func(nowPlay, value)]
  }

  return (
    <Flex>
      <Box>
        <ButtonControl
          icon="random"
          active={shuffle}
          onClick={() => {
            playerStore.pressShuffleButton()
            playerStore.multiShuffleTracks(prefixTracks, url)
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          step={true}
          active={backward}
          icon="step-backward"
          onClick={() => {
            const nextPlay = Step(1, minus)
            if (nextPlay) playerStore.play(nextPlay)
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon={!playerStore.nowPlaying.playing ? 'play' : 'pause'}
          circle={true}
          onClick={() => playerStore.pressButton()}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="step-forward"
          onClick={() => {
            const nextPlay = Step(1, add)
            if (nextPlay) playerStore.play(nextPlay)
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="redo-alt"
          active={redo}
          onClick={() => playerStore.pressRedoButton()}
        />
      </Box>
    </Flex>
  )
}

export default inject('playerStore')(ControlPanel)
