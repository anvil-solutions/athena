import Identifiers from './identifiers.js'
import JsonHelper from './json.js'

function DefaultObject() {
  return {
    symptoms: [],
    notes: [],
    intercourse: false,
    pregnancy: false
  }
}

export default class DayHelper {
  constructor(dateId = Identifiers.getDateId()) {
    this.dateId = dateId
    this.data = JsonHelper.get('a' + dateId, DefaultObject)
  }
  saveData() {
    JsonHelper.set('a' + this.dateId, this.data)
  }
  addSymptom(title) {
    if (this.data.symptoms.includes(title)) {
      return false
    } else {
      this.data.symptoms.push(title)
      this.saveData()
      return true
    }
  }
  removeSymptom(title) {
    this.data.symptoms = this.data.symptoms.filter(i => i != title)
    this.saveData()
  }
}
