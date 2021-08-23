import Common from './common.js'
import JsonHelper from './json.js'

const KEY = 'periods'
const DAY_IN_MS = 86400000

//TODO: predict periods and fertility

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
      this.periods.push([(new Date).getTime() - 12 * DAY_IN_MS, null])
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
      object.ovulation = this.periods.length > i + 1 ? object.end - 14 * DAY_IN_MS : null
      object.fertileStart = this.periods.length > i + 1 ? object.ovulation - 3 * DAY_IN_MS : null
      object.fertileEnd = this.periods.length > i + 1 ? object.ovulation + 2 * DAY_IN_MS : null
      object.days = Common.getDaysDifference(object.start, object.end)
      return object
    })
  }
  filterCycles(start, stop) {
    return this.getCycles().filter(x =>
      x.end >= start.getTime() && x.start <= stop.getTime()
    )
  }
  getStats() {
    const object = {
      cycle: Math.round(this.periods.reduce((acc, cur, i) =>
        acc + (this.periods.length > i + 1 ? this.periods[i + 1][0] - cur[0] : 0)
      , 0) / (this.periods.length - 1) / DAY_IN_MS),
      period: Math.round(this.periods.reduce((acc, cur, i) =>
        acc + (this.periods.length > i + 1 ? cur[1] - cur[0] : 0)
      , 0) / (this.periods.length - 1) / DAY_IN_MS)
    }
    if (this.periods.length > 1) {
      object.nextPeriod = this.periods.slice(-1)[0][0] + object.cycle * DAY_IN_MS
      object.nextPeriodDays = Common.getDaysDifference((new Date()).getTime(), object.nextPeriod)
      object.nextFertile = this.periods.slice(-1)[0][0] + (object.cycle - 17) * DAY_IN_MS
    } else {
      object.cycle = 0
      object.period = 0
      object.nextPeriod = null
      object.nextPeriodDays = 0
      object.nextFertile = null
    }
    return object
  }
}
