/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

import DayHelper from '../helpers/day.js'
import Identifiers from '../helpers/identifiers.js'

//TODO: Working Data

export default {
  name: 'day',
  data() {
    return {
      helper: {}
    }
  },
  computed: {
    Identifiers: () => Identifiers
  },
  template:
  `<page title="Day">
    <div class="card flex center between p-16 mb-16">
      <router-link :to="'?date=' + Identifiers.prevDateId(helper.dateId)" class="material-icons-round text">chevron_left</router-link>
      <h2 class="h3 m-0">{{ Identifiers.dateIdToDate(helper.dateId).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }}</h2>
      <router-link :to="'?date=' + Identifiers.nextDateId(helper.dateId)" class="material-icons-round text">chevron_right</router-link>
    </div>
    <div class="card p-16 mb-16">
      <h3>Flow</h3>
      <p>Not available</p>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Symptoms</h3>
      <ul class="link-list m-0">
        <li v-for="(item, i) in helper.data.symptoms" :key="'s' + i"><span>
          <div class="flex between">
            <span><span class="material-icons-round">arrow_right</span>{{ item }}</span>
            <span v-on:click="removeSymptom(item)" class="material-icons-round text">remove_circle_outline</span>
          </div>
        </span></li>
        <li><router-link :to="'/symptoms?date=' + helper.dateId"><span class="material-icons-round">add</span>Add Symptom</router-link></li>
      </ul>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Notes</h3>
      <ul class="link-list m-0">
        <li v-for="(item, i) in helper.data.notes" :key="'n' + i"><span v-on:click="$router.push('/note?date=' + helper.dateId + '&i=' + i)">
          <div class="flex between">
            <span><span class="material-icons-round">arrow_right</span>{{ item }}</span>
            <span v-on:click.stop="deleteNote(i)" class="material-icons-round text">remove_circle_outline</span>
          </div>
        </span></li>
        <li><router-link :to="'/note?date=' + helper.dateId"><span class="material-icons-round">add</span>Add Note</router-link></li>
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
  </page>`,
  components: {
    Page
  },
  methods: {
    boxState(value) {
      return this.helper.data[value] ? 'check_box' : 'check_box_outline_blank'
    },
    onToggleClicked(value) {
      this.helper.data[value] = !this.helper.data[value]
      this.helper.saveData()
    },
    removeSymptom(title) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Remove Symptom',
          message: 'Are you sure you want to remove "' + title + '"?',
          positiveText: 'Remove',
          positiveFunction: () => {
            this.helper.removeSymptom(title)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    deleteNote(index) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Delete Note',
          message: 'Are you sure you want to delete this note? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            this.helper.data.notes.splice(index, 1)
            this.helper.saveData()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
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
    this.helper = new DayHelper(this.$route.query.date)
  }
}
