import React from 'react'
import ReactPlayer from 'react-player'
import { inject } from '@lib/store'

function Player({ playerStore }) {
  const { url, playing } = playerStore.nowPlaying

  return (
    <ReactPlayer
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={0.8}
      muted={false}
      onProgress={data => {}}
      onEnded={() => {}}
    />
  )
}

export default inject('playerStore')(Player)
