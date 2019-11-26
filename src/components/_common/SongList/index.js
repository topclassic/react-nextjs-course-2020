import React from 'react'
import { Flex } from '@grid'
import SongListItem from './SongListItem'

export default function SongList({ queue, data }) {
  const { tracks } = data
  return (
    <Flex
      flexWrap="wrap"
      width={1}
      css={{ padding: '10px 0', borderRadius: '5px' }}>
      {tracks.map((track, i) => (
        <SongListItem queue={queue} key={i} data={data} track={track} />
      ))}
    </Flex>
  )
}
