import camelcase from 'camelcase'
import { get } from 'lodash'

const formatCamelCase = obj => {
  const newArr = Object.keys(obj).map(key => {
    const newObj = camelcase(key)
    return { [newObj]: obj[key] }
  })
  return Object.assign({}, ...newArr)
}

export const camelCase = data => screenArray(data, formatCamelCase)

export const screenArray = (data, func) => {
  if (Array.isArray(data)) {
    const result = data.map(obj => {
      return func(obj)
    })
    if (result[0]) return result
    return null
  }
  return func(data)
}

export const detailTrackFormat = (data, track) => {
  const tracks = camelCase(track)
  return {
    tracks,
    title: data.name,
    subTitle: data.albumType,
    image: data.images[0].url,
    bottomLine: get(data, 'releaseDate', '')
      ? `${data.releaseDate.split('-')[2]} • ${tracks.length} `
      : `${tracks.length} song`,
  }
}

export const durationPlayList = totalSeconds => {
  totalSeconds = Math.round(totalSeconds)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const addLeadingZero = number => `${number <= 9 ? '0' : ''}${number}`

  return `${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`
}

export const randomShuffle = totalSeconds => {}
