export default {
  getDaysDifference(start, end) {
    return Math.floor((end - start) / 86400000)
  },
  getDayString(quantity) {
    return quantity + (quantity == 1 ? ' day' : ' days')
  },
  simpleDateParams: [undefined, { month: 'short', day: 'numeric' }]
}
