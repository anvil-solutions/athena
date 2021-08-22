/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

//TODO: add edit delete cycle

export default {
  name: 'cycle-details',
  data() {
    return {
      index: 0,
      periods: [[null, null]],
      editing: true
    }
  },
  template:
  `<page title="Cycle">
    <div class="text-center"><span class="very-big accent material-icons-round mb-16">water_drop</span></div>
    <label for="title">Period Start</label>
    <input id="title" v-model="periods[index][0]" class="mb-16" type="date"></input>
    <label for="time">Period End</label>
    <input id="time" v-model="periods[index][1]" class="mb-16" type="date"></input>
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
          title: 'Delete Cycle',
          message: 'Are you sure you want to delete this cycle? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            //TODO: Delete cycle
            setTimeout(() => this.$router.push('/analytics'), 1000)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    onFabClicked() {
      /*if (this.medications[this.index].title.length > 0) {
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
      }*/
    }
  },
  created() {
    /*this.medications = MedicationsHelper.get()
    this.index = this.medications.findIndex(x => x.title == this.$route.query.i)
    if (this.index == -1) {
      this.index = this.medications.length
      this.medications.push({ title: '', time: null })
      this.editing = false
    }*/
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
