/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'
import ModalInput from '../components/modal-input.js'

//TODO: Add, edit, delete symptoms

export default {
  name: 'symptoms',
  data() {
    return {
      searchString: ''
    }
  },
  template:
  `<page title="Symptoms">
    <input v-model="searchString" class="card mb-16" type="text" placeholder="Search" autocomplete="off">
    <ul class="card link-list m-0">
      <li><span v-on:click="onItemClicked()"><span class="material-icons-round">healing</span>Lorem Ipsum</span></li>
      <li><span v-on:click="onItemClicked()"><span class="material-icons-round">healing</span>Dolor Sit</span></li>
      <li><span v-on:click="onItemClicked()"><span class="material-icons-round">healing</span>Amet Consectetur</span></li>
      <li><span v-on:click="onItemClicked()"><span class="material-icons-round">healing</span>Adipiscing Elit</span></li>
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
      const ComponentClass = Vue.extend(ModalInput)
      const instance = new ComponentClass({
        propsData: {
          title: 'New Symptom',
          inputType: 'text',
          initialValue: '',
          positiveFunction: () => {
            console.log(instance.$refs.input.value)
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
