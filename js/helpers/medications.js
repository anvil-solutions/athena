import JsonHelper from './json.js'

const KEY = 'medications'

export default {
  get() {
    return JsonHelper.get(KEY, () => [])
  },
  set(data) {
    JsonHelper.set(KEY, data)
  },
  remove(title) {
    const data = this.get()
    JsonHelper.set(KEY, data.filter(i => i.title != title))
  }
}
