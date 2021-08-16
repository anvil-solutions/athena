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
      <div class="flex between">
        <span v-on:click="setFlow(0)" class="material-icons-round accent">highlight_off</span>
        <span
          v-for="i in 5"
          :key="'f' + i"
          :class="'material-icons-round ' + (i < helper.data.flow + 1 ? 'accent' : 'text')"
          v-on:click="setFlow(i)">
          water_drop
        </span>
      </div>
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
      <h3 class="p-16 pb-0 m-0">Medications</h3>
      <ul class="link-list m-0">
        <li v-for="(item, i) in helper.data.medications" :key="'m' + i"><span v-on:click="$router.push('/medications/details?date=' + helper.dateId + '&i=' + i)">
          <div class="flex between">
            <span><span class="material-icons-round">arrow_right</span>{{ item.title }}</span>
            <span v-on:click.stop="deleteMedication(i)" class="material-icons-round text">remove_circle_outline</span>
          </div>
        </span></li>
        <li><router-link to="/medications/details"><span class="material-icons-round">add</span>Add Medication</router-link></li>
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
    setFlow(value) {
      this.helper.data.flow = value
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
    deleteMedication(index) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Delete Medication',
          message: 'Are you sure you want to delete this medication? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            this.helper.removeMedication(index)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    boxState(value) {
      return this.helper.data[value] ? 'check_box' : 'check_box_outline_blank'
    },
    onToggleClicked(value) {
      this.helper.data[value] = !this.helper.data[value]
      this.helper.saveData()
    }
  },
  created() {
    this.helper = new DayHelper(this.$route.query.date)
  }
}
