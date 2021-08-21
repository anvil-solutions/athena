import Identifiers from './identifiers.js'
import JsonHelper from './json.js'

function DefaultObject() {
  return {
    flow: 0,
    symptoms: [],
    notes: [],
    medications: [],
    intercourse: false,
    pregnancy: false
  }
}

function getLatestEntry(limit) {
  const keys = Object.keys(localStorage).filter(x => x.startsWith('a2') && x < limit).sort((a, b) => a.localeCompare(b) * (-1))
  return keys.length == 0 ? DefaultObject() : JsonHelper.get(keys[0])
}

function prepareDefault(dateId) {
  const latestEntry = getLatestEntry('a' + dateId)
  const result = DefaultObject()
  result.pregnancy = latestEntry.pregnancy
  return result
}

export default class DayHelper {
  constructor(dateId = Identifiers.getDateId()) {
    this.dateId = dateId
    this.data = JsonHelper.get('a' + dateId, prepareDefault)
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
  addMedication(item) {
    if (this.data.medications.some(x => x.title == item.title)) {
      return false
    } else {
      this.data.medications.push(item)
      this.saveData()
      return true
    }
  }
  removeMedication(index) {
    this.data.medications.splice(index, 1)
    this.saveData()
  }
}
