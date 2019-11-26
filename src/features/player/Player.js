import React from 'react'
import ReactPlayer from 'react-player'
import { durationPlayList } from '../../util/format'
import { inject } from '@lib/store'

function Player({ playerStore }) {
  const { nowPlaying, volume } = playerStore
  const { url, playing } = nowPlaying
  const { muted, level } = volume
  return (
    <ReactPlayer
      ref={data => playerStore.ref(data)}
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={level}
      muted={muted}
      onProgress={data => {
        const { loadedSeconds, playedSeconds } = data
        const result = {
          max: loadedSeconds,
          duration: durationPlayList(loadedSeconds),
          progress: playedSeconds,
          timeElapsed: durationPlayList(playedSeconds),
        }
        return playerStore.tabProgress(result)
      }}
      onEnded={() => {}}
    />
  )
}

export default inject('playerStore')(Player)
