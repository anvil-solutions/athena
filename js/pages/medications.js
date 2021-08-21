/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

import MedicationsHelper from '../helpers/medications.js'
import DayHelper from '../helpers/day.js'

export default {
  name: 'Medications',
  data() {
    return {
      searchString: '',
      medications: []
    }
  },
  watch: {
    searchString() { this.refreshList() }
  },
  template:
  `<page title="Medications">
    <input v-model="searchString" class="card mb-16" type="text" placeholder="Search" autocomplete="off">
    <ul class="card link-list mt-0 mb-48 medications">
      <li v-for="(item, i) of medications" :key="i"><span v-on:click="onItemClicked(item)">
        <div class="flex between">
          <span><span class="material-icons-round">medication</span>{{ item.title }}</span>
          <span v-on:click.stop="onEditClicked(item.title)" class="material-icons-round text">edit</span>
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
      this.medications = MedicationsHelper.get()
        .filter(x => x.title.toUpperCase().includes(this.searchString.toUpperCase()))
        .sort((a, b) => a.title.localeCompare(b.title))
    },
    onItemClicked(item) {
      const ComponentClass = Vue.extend(Modal)
      let instance = null
      const helper = new DayHelper(this.$route.query.date)
      if (helper.addMedication(item)) {
        instance = new ComponentClass({
          propsData: {
            title: 'Added Medication',
            message: 'Added ' + item.title + ' as medication.',
            negativeButton: false
          }
        })
      } else {
        instance = new ComponentClass({
          propsData: {
            title: 'Already Added',
            message: item.title + ' is already on your list.',
            negativeButton: false
          }
        })
      }
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    onEditClicked(title) {
      this.$router.push('/medications/details?i=' + title)
    },
    onFabClicked() {
      this.$router.push('/medications/details')
    }
  },
  created() {
    this.refreshList()
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
