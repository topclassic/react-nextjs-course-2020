import React, { useEffect } from 'react'
import { Flex } from '@grid'
import SongListItem from './SongListItem'
import { inject } from '@lib/store'

function SongList({ prefixTracks, playerStore, queue, data }) {
  const { tracks } = data
  useEffect(() => {
    playerStore.multiListTracks(tracks)
    playerStore.setPrefixTracks(prefixTracks)
    playerStore.setOldPrefixTracks(prefixTracks)
  }, [])
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

SongList.defaultProps = {
  prefixTracks: 'listTracks',
}

export default inject('playerStore')(SongList)
