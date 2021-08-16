/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

import DayHelper from '../helpers/day.js'

export default {
  name: 'medications',
  data() {
    return {
      helper: {}
    }
  },
  template:
  `<page title="Medications">
    <ul class="card link-list mt-0 mb-48 medications">
      <li v-for="(item, i) in helper.data.medications" :key="i"><span v-on:click="$router.push('/medications/details?date=' + helper.dateId + '&i=' + i)">
        <div class="flex between">
          <span><span class="material-icons-round">medication</span>{{ item.title }}</span>
          <span v-on:click.stop="deleteMedication(i)" class="material-icons-round text">remove_circle_outline</span>
        </div>
      </span></li>
    </ul>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">add</div>
  </page>`,
  components: {
    Page
  },
  methods: {
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
    onFabClicked() {
      this.$router.push('/medications/details')
    }
  },
  created() {
    this.helper = new DayHelper(this.$route.query.date)
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
