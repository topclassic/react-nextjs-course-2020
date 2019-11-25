import * as API from './repository'
import { get } from 'lodash'
import { detailTrackFormat } from '../../util/format'

export async function getPlaylistById(id, { token }) {
  const data = await API.getPlaylistById(id, { token })
  const tracks = get(data, 'tracks.items', []).map(d => d.track)
  return detailTrackFormat(data, tracks)
}

export async function getMyPlaylist({ token }) {
  const result = await API.getMyPlaylist({ token })
  return { items: result.items }
}
