/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

//TODO: Add, edit, delete medication

export default {
  name: 'medication',
  template:
  `<page title="Medication">
    <ul class="card link-list mt-0 mb-48">
      <li><span v-on:click="onItemClicked()">
        <div class="flex between">
          <span><span class="material-icons-round">medication</span>Lorem Ipsum</span>
          <span class="material-icons-round text">remove_circle_outline</span>
        </div>
      </span></li>
      <li><span v-on:click="onItemClicked()">
        <div class="flex between">
          <span><span class="material-icons-round">medication</span>Dolor Sit</span>
          <span class="material-icons-round text">remove_circle_outline</span>
        </div>
      </span></li>
      <li><span v-on:click="onItemClicked()">
        <div class="flex between">
          <span><span class="material-icons-round">medication</span>Amet Consectetur</span>
          <span class="material-icons-round text">remove_circle_outline</span>
        </div>
      </span></li>
      <li><span v-on:click="onItemClicked()">
        <div class="flex between">
          <span><span class="material-icons-round">medication</span>Adipiscing Elit</span>
          <span class="material-icons-round text">remove_circle_outline</span>
        </div>
      </span></li>
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
