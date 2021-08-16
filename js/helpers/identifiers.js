export default {
  getDateId(date = new Date()) {
    if (!(date instanceof Date)) throw TypeError('Parameter date is not of type Date')
    return date.getFullYear()
      + String(date.getMonth() + 1).padStart(2, '0')
      + String(date.getDate()).padStart(2, '0')
  },
  dateIdToDate(dateId) {
    if (!(typeof dateId == 'string' || dateId instanceof String)) throw TypeError('Parameter dateId is not of type String')
    return new Date(
      dateId.substring(0, 4), dateId.substring(4, 6) - 1, dateId.substring(6, 8)
    )
  }
}
