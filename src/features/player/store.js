import { observable, action } from 'mobx'
import { shuffle, concat } from 'lodash'

export default class PlayerStore {
  @observable
  volume = {
    muted: false,
    level: 1,
  }

  @observable
  nowPlaying = {
    playing: false,
    title: '',
    subTitle: '',
    image: '',
    url: '',
  }

  @observable
  controlPanel = {
    redo: false,
    shuffle: false,
    forward: true,
    backward: true,
  }

  @observable
  oldPrefixTracks = ''

  @observable
  prefixTracks = ''

  @observable
  shuffleTracks = []

  @observable
  queueTracks = []

  @observable
  listTracks = []

  @observable
  progressBar = {
    timeElapsed: '0:00',
    progress: 0,
    duration: '0:30',
    max: 1,
  }

  @observable
  seek = false

  @observable
  player = {
    seekTo: () => {},
  }

  @action
  setOldPrefixTracks(str) {
    this.oldPrefixTracks = str
  }

  @action
  setPrefixTracks(str) {
    this.prefixTracks = str
  }

  @action
  pressForwardButton(bool) {
    this.controlPanel.forward = bool
  }

  @action
  pressBackwardButton(bool) {
    this.controlPanel.backward = bool
  }

  @action
  pressShuffleButton() {
    this.controlPanel.shuffle = !this.controlPanel.shuffle
  }

  @action
  pressRedoButton() {
    this.controlPanel.redo = !this.controlPanel.redo
  }

  @action
  multiListTracks(data) {
    this.listTracks = data
  }

  @action
  multiShuffleTracks(prefixTracks, url) {
    if (this.controlPanel.shuffle) {
      const data = this[prefixTracks]
      if (data !== undefined) {
        const nowPlay = data.find(d => d.previewUrl === url)
        if (nowPlay) {
          const notNowPlay = data.filter(
            d => d.previewUrl !== nowPlay.previewUrl,
          )
          this.oldPrefixTracks = prefixTracks
          const arrRandom = shuffle(notNowPlay)
          const mergArr = concat(nowPlay, arrRandom)
          this.shuffleTracks = mergArr
          this.prefixTracks = 'shuffleTracks'
        }
      }
    } else {
      this.prefixTracks = this.oldPrefixTracks
    }
  }

  @action
  addQueueTracks(data) {
    this.queueTracks = data
  }

  @action
  multiQueueTracks(data) {
    const sameURL = this.queueTracks.find(d => d.previewUrl === data.previewUrl)
    if (!sameURL) this.queueTracks.push(data)
  }

  @action
  pressButtonMuted() {
    this.volume.muted = !this.volume.muted
  }

  @action
  onVolume(data) {
    this.volume.level = data
  }

  @action
  isSeek(bool) {
    this.seek = bool
  }

  @action
  onProgress(progress) {
    this.progressBar.progress = progress
  }

  @action
  tabProgress(data) {
    const { progress, duration, max, timeElapsed } = data
    if (!this.seek) {
      this.progressBar.max = parseInt(max)
      this.progressBar.progress = progress
      this.progressBar.duration = duration
      this.progressBar.timeElapsed = timeElapsed
    }
  }

  @action
  ref(data) {
    this.player = data
  }

  @action
  play(track) {
    const { previewUrl, name, artists, image } = track
    this.nowPlaying.playing = true
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artists[0].name
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl
  }

  @action
  onEnd(url) {
    const nowPlay = this[this.prefixTracks].findIndex(d => d.previewUrl === url)
    const nextPlay = this[this.prefixTracks][nowPlay + 1]
    const { previewUrl, name, artists, image } = nextPlay
    this.nowPlaying.playing = true
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artists[0].name
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl
  }

  @action
  pressButton() {
    this.nowPlaying.playing = !this.nowPlaying.playing
  }
}
