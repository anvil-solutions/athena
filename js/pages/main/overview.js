/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import Modal from '../../components/modal.js'

import Common from '../../helpers/common.js'
import DayHelper from '../../helpers/day.js'
import CycleHelper from '../../helpers/cycle.js'

export default {
  name: 'overview',
  data() {
    return {
      startStopString: '',
      dayHelper: {},
      cycleHelper: {},
      stats: {}
    }
  },
  computed: {
    Common: () => Common
  },
  template:
  `<page-tab-bar>
    <div class="text-center mb-32">
      <h2 class="m-0">{{ Common.getDayString(stats.nextPeriodDays) }}</h2>
      <p class="mt-0 mb-16">Until Next Period</p>
      <div class="flex space">
        <div>
          <h3 class="m-0">{{ (new Date(stats.nextPeriod)).toLocaleDateString(...Common.simpleDateParams) }}</h3>
          <p class="m-0">Next Period</p>
        </div>
        <div>
          <h3 class="m-0">{{ (new Date(stats.nextFertile)).toLocaleDateString(...Common.simpleDateParams) }}</h3>
          <p class="m-0">Next Fertile</p>
        </div>
      </div>
    </div>
    <ul class="link-list card">
      <li>
        <div class="flex between p-16">
          <span v-on:click="setFlow(0)" class="material-icons-round accent">highlight_off</span>
          <span
            v-for="i in 5"
            :key="'f' + i"
            :class="'material-icons-round ' + (i < dayHelper.data.flow + 1 ? 'accent' : 'text')"
            v-on:click="setFlow(i)">
            water_drop
          </span>
        </div>
      </li>
      <li><span v-on:click="onPeriodClicked()">
        <span class="material-icons-round">water_drop</span>{{ startStopString }} Period
      </span></li>
      <li><router-link to="/symptoms"><span class="material-icons-round">healing</span>Add Symptoms</router-link></li>
      <li><router-link to="/note"><span class="material-icons-round">sticky_note_2</span>Add Note</router-link></li>
      <li><router-link to="/medications"><span class="material-icons-round">medication</span>Add Medication</router-link></li>
      <li><span v-on:click="onToggleClicked('intercourse')">
        <div class="flex between">
          <span><span class="material-icons-round">favorite</span>Intercourse</span>
          <span class="material-icons-round text">{{ boxState('intercourse') }}</span>
        </div>
      </span></li>
      <li><span v-on:click="onToggleClicked('pregnancy')">
        <div class="flex between">
          <span><span class="material-icons-round">pregnant_woman</span>Pregnancy</span>
          <span class="material-icons-round text">{{ boxState('pregnancy') }}</span>
        </div>
      </span></li>
    </ul>
  </page-tab-bar>`,
  components: {
    PageTabBar
  },
  methods: {
    setFlow(value) {
      this.dayHelper.data.flow = value
      this.dayHelper.saveData()
    },
    boxState(value) {
      return this.dayHelper.data[value] ? 'check_box' : 'check_box_outline_blank'
    },
    onToggleClicked(value) {
      this.dayHelper.data[value] = !this.dayHelper.data[value]
      this.dayHelper.saveData()
    },
    onPeriodClicked() {
      this.cycleHelper.startStop()
      this.startStopString = this.cycleHelper.isStarted() ? 'End' : 'Start'
      const ComponentClass = Vue.extend(Modal)
      let instance = null
      if (this.cycleHelper.isStarted()) {
        instance = new ComponentClass({
          propsData: {
            title: 'Started Period',
            message: 'You started your period.',
            negativeButton: false
          }
        })
      } else {
        instance = new ComponentClass({
          propsData: {
            title: 'Ended Period',
            message: 'You ended your period.',
            negativeButton: false
          }
        })
      }
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  },
  created() {
    this.dayHelper = new DayHelper()
    this.cycleHelper = new CycleHelper()
    this.startStopString = this.cycleHelper.isStarted() ? 'End' : 'Start'
    this.stats = this.cycleHelper.getStats()
  },
  mounted() {
    if (localStorage.getItem('help_overview') == null) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Overview Page',
          message: 'On this page, you can track your current cycle. Quickly add symptoms, notes, and more.',
          positiveFunction: () => {
            localStorage.setItem('help_overview', '1')
          },
          negativeButton: false
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
