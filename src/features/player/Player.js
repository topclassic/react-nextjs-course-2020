import React, { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { durationPlayList } from '../../util/format'
import { inject } from '@lib/store'

function Player({ playerStore }) {
  const { nowPlaying, volume, controlPanel, queueTracks } = playerStore
  const { url, playing } = nowPlaying
  const { muted, level } = volume
  const { redo } = controlPanel
  const playRef = useRef(null)

  useEffect(() => {
    playerStore.ref(playRef.current)
  })

  return (
    <ReactPlayer
      ref={playRef}
      css={{ display: 'none' }}
      playing={playing}
      loop={redo}
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
      onEnded={() => {
        const nowPlay = queueTracks.findIndex(d => d.previewUrl === url)
        const nextPlay = queueTracks[nowPlay + 1]
        if (nextPlay) playerStore.play(nextPlay)
      }}
    />
  )
}

export default inject('playerStore')(Player)
