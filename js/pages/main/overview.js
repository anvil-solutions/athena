/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import Modal from '../../components/modal.js'

import DayHelper from '../../helpers/day.js'

//TODO: Working Links

export default {
  name: 'overview',
  data() {
    return {
      helper: {}
    }
  },
  template:
  `<page-tab-bar>
    <div class="text-center mb-32">
      <h2 class="m-0">0 Days</h2>
      <p class="mt-0 mb-16">Until Next Period</p>
      <div class="flex space">
        <div>
          <h3 class="m-0">Jan 1st</h3>
          <p class="m-0">Next Period</p>
        </div>
        <div>
          <h3 class="m-0">Jan 1st</h3>
          <p class="m-0">Next Fertile</p>
        </div>
      </div>
    </div>
    <ul class="link-list card">
      <li><span v-on:click="onItemClicked()"><span class="material-icons-round">water_drop</span>Start Period</span></li>
      <li><span v-on:click="onItemClicked()"><span class="material-icons-round">water</span>Enter Flow</span></li>
      <li><router-link to="/symptoms"><span class="material-icons-round">healing</span>Add Symptoms</router-link></li>
      <li><router-link to="/note"><span class="material-icons-round">sticky_note_2</span>Add Note</router-link></li>
      <li><router-link to="/medication"><span class="material-icons-round">medication</span>Medication</router-link></li>
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
    boxState(value) {
      return this.helper.data[value] ? 'check_box' : 'check_box_outline_blank'
    },
    onToggleClicked(value) {
      this.helper.data[value] = !this.helper.data[value]
      this.helper.saveData()
    },
    onItemClicked() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Not Yet Implemented',
          message: 'This feature is not yet implemented.',
          negativeButton: false
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  },
  created() {
    this.helper = new DayHelper()
  }
}
