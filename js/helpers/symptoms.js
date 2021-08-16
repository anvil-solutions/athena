import JsonHelper from './json.js'
import Symptoms from '../data/symptoms.js'

const KEY = 'symptoms'

export default {
  get() {
    return JsonHelper.get(KEY, () => JSON.parse(JSON.stringify(Symptoms)))
  },
  add(item) {
    const data = this.get()
    data.push(item)
    JsonHelper.set(KEY, data)
  },
  remove(item) {
    const data = this.get()
    JsonHelper.set(KEY, data.filter(i => i != item))
  }
}
