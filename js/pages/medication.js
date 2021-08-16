/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

//TODO: Add, edit, delete medication

export default {
  name: 'medication',
  template:
  `<page title="Medication">
    <ul class="card link-list m-0">
      <li><span v-on:click="onItemClicked()"><span class="material-icons-round">medication</span>Lorem Ipsum</span></li>
      <li><span v-on:click="onItemClicked()"><span class="material-icons-round">medication</span>Dolor Sit</span></li>
      <li><span v-on:click="onItemClicked()"><span class="material-icons-round">medication</span>Amet Consectetur</span></li>
      <li><span v-on:click="onItemClicked()"><span class="material-icons-round">medication</span>Adipiscing Elit</span></li>
    </ul>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">add</div>
  </page>`,
  components: {
    Page
  },
  methods: {
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
    },
    onFabClicked() {
      this.$router.push('/medication/details')
    }
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
