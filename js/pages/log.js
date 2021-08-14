/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

import JsonHelper from '../helpers/json.js'

export default {
  name: 'log',
  data() {
    return {
      items: JsonHelper.get('errors', () => [])
    }
  },
  template:
  `<page title="Error Log">
    <ul class="link-list ignore-page-padding">
      <li v-for="(item, i) in items" :key="i">
        <span>
          Error<br>
          <span class="p">{{ item }}</span>
        </span>
      </li>
    </ul>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">delete</div>
  </page>`,
  components: {
    Page
  },
  methods: {
    onFabClicked() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Clear Error Log',
          message: 'Are you sure you want to clear the error log? This cannot be undone.',
          positiveText: 'Reset',
          positiveFunction: () => {
            localStorage.removeItem('errors')
            this.items = []
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
