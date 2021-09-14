/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

import Common from '../helpers/common.js'
import CycleHelper from '../helpers/cycle.js'
import DayHelper from '../helpers/day.js'

export default {
  name: 'cycle-details',
  data() {
    return {
      helper: {},
      cycle: {},
      data: {}
    }
  },
  computed: {
    Common: () => Common
  },
  template:
  `<page title="Cycle">
    <div class="card p-16 red mb-16">
      <p class="m-0">
        <small>{{ (new Date(cycle.start)).toLocaleDateString(...Common.simpleDateParams) }} - {{ (new Date(cycle.end)).toLocaleDateString(...Common.simpleDateParams) }}</small>
      </p>
      <progress :value="cycle.periodEnd - cycle.start" :max="cycle.end - cycle.start"></progress>
    </div>
    <div class="card p-16 mb-16">
      <div class="flex between center mb-8">
        <p class="m-0">{{ Common.getDayString(cycle.days) }}</p><small class="p m-0">Cycle Length</small>
      </div>
      <div class="flex between center">
        <p class="m-0">{{ Common.getDayString(Common.getDaysDifference(cycle.start, cycle.periodEnd)) }}</p><small class="p m-0">Period Length</small>
      </div>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Symptoms</h3>
      <ul class="link-list m-0 ux-list">
        <li v-for="(item, i) in data.symptoms" :key="'s' + i">
          <span><span class="material-icons-round">healing</span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Notes</h3>
      <ul class="link-list m-0 ux-list">
        <li v-for="(item, i) in data.notes" :key="'n' + i">
          <span><span class="material-icons-round">sticky_note_2</span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="flex end">
      <button type="button" class="mb-48" v-on:click="onDeleteClicked()">Delete</button>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">edit</div>
  </page>`,
  components: {
    Page
  },
  methods: {
    onDeleteClicked() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Delete Cycle',
          message: 'Are you sure you want to delete this cycle? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            this.helper.remove(this.index)
            setTimeout(() => this.$router.push('/analytics'), 1000)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    onFabClicked() {
      this.$router.push('/analytics/cycle/details?i=' + this.$route.query.i)
    }
  },
  created() {
    this.helper = new CycleHelper()
    this.cycle = this.helper.getCycles()[this.$route.query.i]
    this.data = DayHelper.getData(this.cycle.start, this.cycle.end)
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
