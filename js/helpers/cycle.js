import JsonHelper from './json.js'

const KEY = 'periods'

export default class CycleHelper {
  constructor() {
    this.periods = JsonHelper.get(KEY, () => []).sort((a, b) => a[0] - b[0])
  }
  save() {
    JsonHelper.set(KEY, this.periods)
  }
  isStarted() {
    return this.periods.length != 0 && this.periods[this.periods.length - 1][1] == null
  }
  startStop() {
    if (this.isStarted()) {
      this.periods[this.periods.length - 1][1] = (new Date).getTime()
    } else {
      this.periods.push([(new Date).getTime(), null])
    }
    this.save()
  }
  remove(index) {
    this.periods.splice(index, 1)
    this.save()
  }
  getCycles() {
    const date = new Date
    return this.periods.map((x, i) => {
      const object = {
        start: x[0],
        periodEnd: x[1] || date.getTime(),
        end: this.periods.length > i + 1 ? this.periods[i + 1][0] : date.getTime()
      }
      object.days = Math.floor((object.end - object.start) / 86400000)
      return object
    })
  }
}
