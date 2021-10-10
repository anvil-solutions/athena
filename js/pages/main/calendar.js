/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import Modal from '../../components/modal.js'

import Common from '../../helpers/common.js'
import Identifiers from '../../helpers/identifiers.js'
import DayHelper from '../../helpers/day.js'
import CycleHelper from '../../helpers/cycle.js'

//TODO: Fix alignment

export default {
  name: 'calendar',
  data() {
    return {
      month: 0,
      year: 0,
      days: [],
      cycles: [],
      warning: false
    }
  },
  computed: {
    months: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'Decemeber'],
    weekDays: () => ['Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat', 'Sun']
  },
  template:
  `<page-tab-bar id="calendar">
    <div class="card mb-16 p-16">
      <h2 class="h3">
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
    <p class="card p mb-16 p-16" v-if="warning">
      There is not enough data to predict future cycles yet.
      At least two cycles are needed for predictions.
    </p>
    <div class="card p-16 text-center grid-7 no-stretch">
      <div v-for="(item, i) in weekDays" :key="i + 200">{{ item }}</div>
      <button
        v-for="(item, i) in days"
        :key="i"
        :class="(item.highlighted ? 'highlighted' : '') + ' ' + item.class"
        type="button"
        v-on:click="if (item.clickable) openDay(item.day)">
          <div>{{ item.title }}</div>
          <div>
            <span
              v-for="(icon, j) in item.icons"
              :key="'d' + i + 'i' + j"
              class="material-icons-round small">
              {{ icon }}
            </span>
          </div>
        </button>
    </div>
  </page-tab-bar>`,
  components: {
    PageTabBar
  },
  methods: {
    getDateId(day) {
      return this.year + String(this.month + 1).padStart(2, '0') + String(day).padStart(2, '0')
    },
    openDay(day) {
      this.$router.push('/day?date=' + this.getDateId(day))
    },
    filterCycles(start, stop) {
      return this.cycles.filter(x =>
        x.end >= start.getTime() && x.start <= stop.getTime()
      )
    },
    getDays() {
      let i, j
      const days = []
      const firstDay = new Date(this.year, this.month, 1)
      const today = new Date()
      const lastDay = new Date(this.year, this.month + 1, 0)
      const cycles = this.filterCycles(firstDay, lastDay)
      let offset = firstDay.getDay()
      if (offset == 0) offset += 6
      else offset -= 1
      let dayCount = 1
      let dateId = null
      let date = null
      let inPeriod = false
      let ovulation = false
      let fertile = false
      let icons = []
      for (i = 0; i < 6; i++) {
        for (j = 0; j < 7; j++) {
          if (offset == 0) {
            if (dayCount > lastDay.getDate()) break
            dateId = this.getDateId(dayCount)
            date = Identifiers.dateIdToDate(dateId)
            inPeriod = cycles.some(x => Common.isInTimeSpan(date, x.start, x.periodEnd))
            ovulation = cycles.some(x => Common.isInTimeSpan(date, x.ovulation, x.ovulation))
            fertile = cycles.some(x => Common.isInTimeSpan(date, x.fertileStart, x.fertileEnd))
            icons = DayHelper.getIndicators(dateId)
            if (ovulation) icons.push('egg_alt')
            days.push({
              title: dayCount,
              icons: icons,
              class: (inPeriod ? 'red ' : '')
                + (fertile ? 'light-blue ' : '')
                + ((this.year == today.getFullYear() && this.month == today.getMonth() && dayCount > today.getDate()) || (this.year == today.getFullYear() && this.month > today.getMonth()) || this.year > today.getFullYear() ? 'future' : ''),
              clickable: true,
              day: dayCount,
              highlighted: (dayCount == today.getDate()
                && this.month == today.getMonth()
                && this.year == today.getFullYear())
                || inPeriod
                || fertile
            })
            dayCount++
          } else {
            days.push({
              title: '',
              icons: [],
              class: '',
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
    const cycleHelper = new CycleHelper
    this.cycles = cycleHelper.getCyclesPlus(6)
    this.warning = cycleHelper.periods.length < 2
    const date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth()
    this.getDays()
  },
  mounted() {
    if (localStorage.getItem('help_calendar') == null) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Calendar Page',
          message: 'Use this page to track your current cycle, your past cycles, or to see when your future periods will be.',
          positiveFunction: () => {
            localStorage.setItem('help_calendar', '1')
          },
          negativeButton: false
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
