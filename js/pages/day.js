/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

//TODO: Working Data

export default {
  name: 'day',
  data() {
    return {
      intercourse: false,
      pregnancy: false
    }
  },
  template:
  `<page title="Day">
    <div class="card flex center between p-16 mb-16">
      <span class="material-icons-round">chevron_left</span>
      <h2 class="h3 m-0">Jan 1st 2021</h2>
      <span class="material-icons-round">chevron_right</span>
    </div>
    <div class="card p-16 mb-16">
      <h3>Flow</h3>
      <p>No notes available</p>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Symptoms</h3>
      <ul class="link-list m-0">
        <li><span v-on:click="onItemClicked()">
          <div class="flex between">
            <span><span class="material-icons-round">arrow_right</span>Lorem Ipsum</span>
            <span class="material-icons-round text">remove_circle_outline</span>
          </div>
        </span></li>
        <li><span v-on:click="onItemClicked()">
          <div class="flex between">
            <span><span class="material-icons-round">arrow_right</span>Dolor Sit</span>
            <span class="material-icons-round text">remove_circle_outline</span>
          </div>
        </span></li>
        <li><router-link to="/symptoms"><span class="material-icons-round">add</span>Add Symptom</router-link></li>
      </ul>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Notes</h3>
      <ul class="link-list m-0">
        <li><span v-on:click="onItemClicked()">
          <div class="flex between">
            <span><span class="material-icons-round">arrow_right</span>Lorem Ipsum</span>
            <span class="material-icons-round text">remove_circle_outline</span>
          </div>
        </span></li>
        <li><router-link to="/note"><span class="material-icons-round">add</span>Add Note</router-link></li>
      </ul>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Medication</h3>
      <ul class="link-list m-0">
        <li><span v-on:click="onItemClicked()">
          <div class="flex between">
            <span><span class="material-icons-round">arrow_right</span>Lorem Ipsum</span>
            <span class="material-icons-round text">remove_circle_outline</span>
          </div>
        </span></li>
        <li><router-link to="/medication/details"><span class="material-icons-round">add</span>Add Medication</router-link></li>
      </ul>
    </div>
    <ul class="card link-list m-0">
      <li><span v-on:click="onToggleClicked('intercourse')">
        <div class="flex between">
          <span><span class="material-icons-round">favorite</span>Intercourse</span>
          <span class="material-icons-round text">{{ boxState(intercourse) }}</span>
        </div>
      </span></li>
      <li><span v-on:click="onToggleClicked('pregnancy')">
        <div class="flex between">
          <span><span class="material-icons-round">pregnant_woman</span>Pregnancy</span>
          <span class="material-icons-round text">{{ boxState(pregnancy) }}</span>
        </div>
      </span></li>
    </ul>
  </page>`,
  components: {
    Page
  },
  methods: {
    boxState(value) {
      return value ? 'check_box' : 'check_box_outline_blank'
    },
    onToggleClicked(value) {
      this[value] = !this[value]
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
  }
}
