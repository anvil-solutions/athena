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

function prepareDefault(dateId) {
  const keys = Object.keys(localStorage).filter(x => x.startsWith('a2') && x < 'a' + dateId).sort((a, b) => a.localeCompare(b) * (-1))
  if (keys.length == 0) {
    return DefaultObject()
  } else {
    const latestEntry = JsonHelper.get(keys[0])
    const result = DefaultObject()
    result.pregnancy = latestEntry.pregnancy
    return result
  }
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
  static getIndicators(dateId) {
    const data = JsonHelper.get('a' + dateId, prepareDefault)
    const icons = []
    if (data.flow > 0) icons.push('water_drop')
    if (data.symptoms.length > 0) icons.push('healing')
    if (data.notes.length > 0) icons.push('sticky_note_2')
    if (data.medications.length > 0) icons.push('medication')
    if (data.intercourse) icons.push('favorite')
    return icons
  }
  static getData(start, stop) {
    const result = {
      symptoms: [],
      notes: []
    }
    const keys = Object.keys(localStorage).filter(x =>
      x.startsWith('a2') && x >= 'a' + Identifiers.getDateId(new Date(start)) && x <= 'a' + Identifiers.getDateId(new Date(stop))
    )
    keys.forEach(item => {
      const data = JsonHelper.get(item)
      result.symptoms.push(...data.symptoms)
      result.notes.push(...data.notes)
    })
    result.symptoms = Array.from(new Set(result.symptoms))
    result.notes = Array.from(new Set(result.notes))
    result.symptoms.sort((a, b) => a.localeCompare(b))
    result.notes.sort((a, b) => a.localeCompare(b))
    return result
  }
}
