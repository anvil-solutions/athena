import PageTabBar from '../../components/page-tab-bar.js'

//TODO: Calendar indicators
//TODO: Display Notes

export default {
  name: 'calendar',
  data() {
    return {
      month: 0,
      year: 0,
      days: [],
    }
  },
  computed: {
    months: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'Decemeber'],
    weekDays: () => ['Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat', 'Sun']
  },
  template:
  `<page-tab-bar id="calendar">
    <div class="card mb-16 p-16">
      <h2>
        <span>{{ months[month] }}</span>
        <div class="controls">
          <button type="button" v-on:click="prevMonth()">Previous</button>
          <button type="button" v-on:click="nextMonth()">Next</button>
        </div>
      </h2>
      <h3>
        <span>{{ year }}</span>
        <div class="controls">
          <button type="button" v-on:click="prevYear()">Previous</button>
          <button type="button" v-on:click="nextYear()">Next</button>
        </div>
      </h3>
    </div>
    <div class="card mb-16 p-16 text-center grid-7">
      <div v-for="(item, i) in weekDays" :key="i + 200">{{ item }}</div>
      <button
        v-for="(item, i) in days"
        :key="i"
        :class="{ today: item.highlighted }"
        type="button"
        v-on:click="if (item.clickable) openDay(item.day)">
          {{ item.title }}
        </button>
    </div>
    <div class="card p-16">
      <h3>Notes</h3>
      <p>No notes available</p>
    </div>
  </page-tab-bar>`,
  components: {
    PageTabBar
  },
  methods: {
    openDay(day) {
      this.$router.push('/day?date=' + this.year + String(this.month + 1).padStart(2, '0') + String(day).padStart(2, '0'))
    },
    getDays() {
      let i, j
      const days = []

      const firstDay = new Date(this.year, this.month, 1)
      const today = new Date()
      const lastDay = new Date(this.year, this.month + 1, 0)
      let offset = firstDay.getDay()
      if (offset == 0) offset += 6
      else offset -= 1
      let dayCount = 1
      for (i = 0; i < 6; i++) {
        for (j = 0; j < 7; j++) {
          if (offset == 0) {
            if (dayCount > lastDay.getDate()) break
            days.push({
              title: dayCount,
              clickable: true,
              day: dayCount,
              highlighted: dayCount == today.getDate()
                && this.month == today.getMonth()
                && this.year == today.getFullYear()
            })
            dayCount++
          } else {
            days.push({
              title: '',
              clickable: false
            })
            offset--
          }
        }
      }
      this.days = days
    },
    prevMonth() {
      if (this.month > 0) this.month--
      else {
        this.year--
        this.month = 11
      }
      this.getDays()
    },
    nextMonth() {
      if (this.month < 11) this.month++
      else {
        this.year++
        this.month = 0
      }
      this.getDays()
    },
    prevYear() {
      this.year--
      this.getDays()
    },
    nextYear() {
      this.year++
      this.getDays()
    }
  },
  created() {
    const date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth()

    this.getDays()
  }
}
