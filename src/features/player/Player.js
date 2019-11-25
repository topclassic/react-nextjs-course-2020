import React from 'react'
import ReactPlayer from 'react-player'
import { durationPlayList } from '../../util/format'
import { inject } from '@lib/store'

function Player({ playerStore }) {
  const { nowPlaying } = playerStore
  const { url, playing } = nowPlaying
  return (
    <ReactPlayer
      ref={data => playerStore.ref(data)}
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={0.8}
      muted={false}
      onProgress={data => {
        const { loadedSeconds, playedSeconds } = data
        const result = {
          max: loadedSeconds,
          duration: durationPlayList(loadedSeconds),
          progress: playedSeconds,
        }
        return playerStore.tabProgress(result)
      }}
      onEnded={() => {}}
    />
  )
}

export default inject('playerStore')(Player)
