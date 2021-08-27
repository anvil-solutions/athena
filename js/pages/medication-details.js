/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

import MedicationsHelper from '../helpers/medications.js'

export default {
  name: 'medication-details',
  data() {
    return {
      index: 0,
      medications: [],
      editing: true
    }
  },
  template:
  `<page title="Medication">
    <div class="text-center"><span class="very-big accent material-icons-round mb-16">medication</span></div>
    <p class="text-center mt-0 mb-16">Enter the details below.</p>
    <label for="title">Title</label>
    <input id="title" v-model="medications[index].title" class="mb-16" type="text" autocomplete="off"></input>
    <label for="time">Time</label>
    <input ref="time" id="time" class="mb-16" type="time"></input>
    <ul class="link-list mt-0 mb-16 ignore-page-padding">
      <li><span v-on:click="onToggleClicked('reminder')">
        <div class="flex between">
          <span><span class="material-icons-round">notifications</span>Reminder</span>
          <span class="material-icons-round text">{{ boxState('reminder') }}</span>
        </div>
      </span></li>
      <li><div class="flex p-16">
        <span class="material-icons-round">warning</span>
        <span>Notifications are not available yet!</span>
      </div></li>
      <!--li><div class="flex p-16">
        <span class="material-icons-round">warning</span>
        <span>Reminders are experimental and do not work on Apple devices!</span>
      </div></li-->
    </ul>
    <div v-if="editing" class="flex end">
      <button type="button" class="mb-48" v-on:click="onDeleteClicked()">Delete</button>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">done</div>
  </page>`,
  components: {
    Page
  },
  methods: {
    boxState(value) {
      return this.medications[this.index][value] ? 'check_box' : 'check_box_outline_blank'
    },
    onToggleClicked(value) {
      this.medications[this.index][value] = !this.medications[this.index][value]
    },
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
        this.medications[this.index].time = this.$refs.time.value
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
      this.medications.push({ title: '', time: null, reminder: false })
      this.editing = false
    }
  },
  mounted() {
    this.$refs.time.value = this.medications[this.index].time
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
