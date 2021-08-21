/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

import MedicationsHelper from '../helpers/medications.js'

//TODO: Reminders

export default {
  name: 'medication-details',
  data() {
    return {
      helper: {},
      index: 0,
      medications: [],
      editing: true
    }
  },
  template:
  `<page title="Medication">
    <div class="text-center"><span class="very-big accent material-icons-round mb-16">medication</span></div>
    <label for="title">Title</label>
    <input id="title" v-model="medications[index].title" class="mb-16" type="text" autocomplete="off"></input>
    <label for="time">Time</label>
    <input id="time" v-model="medications[index].time" class="mb-16" type="time"></input>
    <div v-if="editing" class="flex end">
      <button type="button" v-on:click="onDeleteClicked()">Delete</button>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">done</div>
  </page>`,
  components: {
    Page
  },
  methods: {
    onDeleteClicked() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Delete Medication',
          message: 'Are you sure you want to delete this medication? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            MedicationsHelper.remove(this.medications[this.index].title)
            setTimeout(() => this.$router.push(this.$route.query.date ? '/medications?date=' + this.$route.query.date : '/medications'), 1000)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    onFabClicked() {
      if (this.medications[this.index].title.length > 0) {
        MedicationsHelper.set(this.medications)
        this.$router.push(this.$route.query.date ? '/medications?date=' + this.$route.query.date : '/medications')
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
    this.medications = MedicationsHelper.get()
    this.index = this.medications.findIndex(x => x.title == this.$route.query.i)
    if (this.index == -1) {
      this.index = this.medications.length
      this.medications.push({ title: '', time: null })
      this.editing = false
    }
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
