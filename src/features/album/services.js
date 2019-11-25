import * as API from './repository'
import { get } from 'lodash'
import { detailTrackFormat } from '../../util/format'

export function getNewReleases({ token, limit }) {
  return API.getNewReleases({ token, limit })
}

export async function getAlbumById(id, { token }) {
  const data = await API.getAlbumById(id, { token })
  const tracks = get(data, 'tracks.items', [])
  return detailTrackFormat(data, tracks)
}
