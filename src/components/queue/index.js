import React from 'react'
import { Flex, Box } from '@grid'
import { flowRight as compose } from 'lodash'
import { inject } from '@lib/store'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import colors from '@features/_ui/colors'

import SongList from '@common/SongList'

function QueuePage({ playerStore }) {
  const { queueTracks } = playerStore
  const { token } = useMember()

  if (token === null) {
    return null
  }

  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Box width={1}>
        <h1
          css={{
            color: colors.link,
            fontSize: '2em',
            padding: '50px 10px 10px',
          }}>
          Queue
        </h1>
      </Box>
      <Box width={1}>
        <SongList queue={true} tracks={queueTracks} />
      </Box>
    </Flex>
  )
}

export default compose(
  withPage({ restricted: true }),
  inject('playerStore'),
)(QueuePage)
