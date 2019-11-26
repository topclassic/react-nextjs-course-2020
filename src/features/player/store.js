import { observable, action } from 'mobx'

export default class PlayerStore {
  @observable
  volume = {
    muted: false,
    level: 0.8,
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
    const fixbux = progress.split('.')
    let fix = progress
    if (fixbux.length > 1 && fixbux[0] === '0') fix = 1
    this.progressBar.progress = fix
  }

  @action
  tabProgress(data) {
    const { progress, duration, max, timeElapsed } = data
    if (!this.seek) {
      this.progressBar.max = max
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
  pressButton() {
    this.nowPlaying.playing = !this.nowPlaying.playing
  }
}
