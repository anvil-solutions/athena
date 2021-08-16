/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

import DayHelper from '../helpers/day.js'

//TODO: Reminders

export default {
  name: 'medication-details',
  data() {
    return {
      helper: {},
      index: 0,
      medication: {}
    }
  },
  template:
  `<page title="Medication">
    <div class="text-center"><span class="very-big accent material-icons-round mb-16">medication</span></div>
    <label for="title">Title</label>
    <input id="title" v-model="medication.title" class="mb-16" type="text" autocomplete="off"></input>
    <label for="time">Time</label>
    <input id="time" v-model="medication.time" type="time"></input>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">done</div>
  </page>`,
  components: {
    Page
  },
  methods: {
    onFabClicked() {
      if (this.medication.title.length > 0) {
        this.helper.data.medications[this.index] = this.medication
        this.helper.saveData()
        this.$router.push(this.$route.query.date ? '/day?date=' + this.$route.query.date : '/day')
      } else {
        const ComponentClass = Vue.extend(Modal)
        const instance = new ComponentClass({
          propsData: {
            title: 'Enter A Title',
            message: 'Please enter a title first.',
            negativeButton: false
          }
        })
        instance.$mount()
        this.$root.$el.appendChild(instance.$el)
      }
    }
  },
  created() {
    this.helper = new DayHelper(this.$route.query.date)
    this.index = this.$route.query.i || this.helper.data.medications.length
    this.medication = this.helper.data.medications[this.index] || { title: '', time: null }
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
