import Common from './common.js'
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
      object.days = Common.getDaysDifference(object.start, object.end)
      return object
    })
  }
  getStats() {
    const cycles = this.getCycles().slice(0, -1)
    return {
      cycle: Math.round(cycles.reduce((acc, cur) => acc + cur.end - cur.start, 0) / cycles.length / 86400000),
      period: Math.round(cycles.reduce((acc, cur) => acc + cur.periodEnd - cur.start, 0) / cycles.length / 86400000)
    }
  }
}
