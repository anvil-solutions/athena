/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'
import ModalInput from '../components/modal-input.js'

import SymptomsHelper from '../helpers/symptoms.js'
import DayHelper from '../helpers/day.js'

export default {
  name: 'symptoms',
  data() {
    return {
      searchString: '',
      symptoms: []
    }
  },
  watch: {
    searchString() { this.refreshList() }
  },
  template:
  `<page title="Symptoms">
    <input v-model="searchString" class="card mb-16" type="text" placeholder="Search" autocomplete="off">
    <ul class="card link-list mt-0 mb-48 search">
      <li v-for="(item, i) of symptoms" :key="i"><span v-on:click="onItemClicked(item)">
        <div class="flex between">
          <span><span class="material-icons-round">healing</span>{{ item }}</span>
          <span v-on:click.stop="onDeleteClicked(item)" class="material-icons-round text">remove_circle_outline</span>
        </div>
      </span></li>
    </ul>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">add</div>
  </page>`,
  components: {
    Page
  },
  methods: {
    refreshList() {
      this.symptoms = SymptomsHelper.get()
        .filter(x => x.toUpperCase().includes(this.searchString.toUpperCase()))
        .sort((a, b) => a.localeCompare(b))
    },
    onItemClicked(item) {
      const ComponentClass = Vue.extend(Modal)
      let instance = null
      const helper = new DayHelper(this.$route.query.date)
      if (helper.addSymptom(item)) {
        instance = new ComponentClass({
          propsData: {
            title: 'Added Symptom',
            message: 'Added ' + item + ' as a symptom.',
            negativeButton: false
          }
        })
      } else {
        instance = new ComponentClass({
          propsData: {
            title: 'Already Added',
            message: item + ' is already on your list.',
            negativeButton: false
          }
        })
      }
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    onDeleteClicked(title) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Delete Item',
          message: 'Are you sure you want to delete this item? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            SymptomsHelper.remove(title)
            this.refreshList()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    onFabClicked() {
      const ComponentClass = Vue.extend(ModalInput)
      const instance = new ComponentClass({
        propsData: {
          title: 'New Symptom',
          inputType: 'text',
          initialValue: '',
          positiveFunction: () => {
            SymptomsHelper.add(instance.$refs.input.value)
            this.refreshList()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  },
  created() {
    this.refreshList()
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
