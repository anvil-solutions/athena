import Common from './common.js'
import JsonHelper from './json.js'

const KEY = 'periods'
const DAY_IN_MS = 86400000

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
      this.periods[this.periods.length - 1][1] = (new Date).getTime() - 43200000
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
    const stats = this.getStats()
    const now = (new Date).getTime()
    return this.periods.map((x, i) => {
      const object = {
        start: x[0],
        periodEnd: x[1] || now,
        end: this.periods.length > i + 1 ? this.periods[i + 1][0] : now
      }
      object.ovulation = (this.periods.length > i + 1 ? object.end : object.start + stats.cycle * DAY_IN_MS) - 14 * DAY_IN_MS
      object.fertileStart = object.ovulation - 3 * DAY_IN_MS
      object.fertileEnd = object.ovulation + 2 * DAY_IN_MS
      object.days = Common.getDaysDifference(object.start, object.end)
      object.valid = object.end - object.periodEnd > object.periodEnd - object.start
                      && object.periodEnd - object.start > 0
                      && object.end - object.start < 3.888e+9
                      && object.end - object.start > 1.814e+9
      return object
    })
  }
  getCyclesPlus(additionalCycles) {
    const cycles = this.getCycles().filter(x => x.valid)
    if (this.periods.length < 2) return cycles

    const stats = this.getStats()
    cycles[cycles.length - 1].end = cycles[cycles.length - 1].start + stats.cycle * DAY_IN_MS

    let lastItem = null
    for (let i = 0; i < additionalCycles; i++) {
      lastItem = cycles[cycles.length - 1]
      const object = {
        start: lastItem.end,
        periodEnd: lastItem.end + stats.period * DAY_IN_MS,
        end: lastItem.end + stats.cycle * DAY_IN_MS
      }
      object.ovulation = lastItem.end + (stats.cycle - 14) * DAY_IN_MS
      object.fertileStart = object.ovulation - 3 * DAY_IN_MS
      object.fertileEnd = object.ovulation + 2 * DAY_IN_MS
      cycles.push(object)
    }
    return cycles
  }
  getStats() {
    const object = {
      cycle: null,
      period: null
    }
    let counter = 0
    this.periods.forEach((item, i) => {
      let periodLength = (this.periods.length > i + 1 ? item[1] - item[0] : 0)
      let cycleLength = (this.periods.length > i + 1 ? this.periods[i + 1][0] - item[0] : 0)
      if (periodLength > 0 && cycleLength - periodLength > periodLength && cycleLength < 3.888e+9 && cycleLength > 1.814e+9) {
        object.cycle += cycleLength
        object.period += periodLength
        counter++
      }
    })
    object.cycle = Math.round(object.cycle / counter / DAY_IN_MS)
    object.period = Math.round(object.period / counter / DAY_IN_MS)
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
