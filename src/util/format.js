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

export const durationPlayList = data => {
  const secToMin = data / 100
  const arr = secToMin.toString().split('.')
  return `${arr[0]}:${arr[1].charAt(0)}${arr[1].charAt(1)}`
}
