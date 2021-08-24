/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'
import ModalTheme from '../components/modal-theme.js'

export default {
  name: 'app-settings',
  template:
  `<page title="App Settings">
    <ul class="link-list ignore-page-padding">
      <li v-on:click="changeTheme()"><span><span class="material-icons-round">palette</span>Change theme</span></li>
      <li v-on:click="resetHelp()"><span><span class="material-icons-round">support</span>Reset tutorial dialogs</span></li>
      <li v-on:click="clearCache()"><span><span class="material-icons-round">cached</span>Clear cache</span></li>
      <li><router-link to="/account/app/log"><span class="material-icons-round">report</span>View error log</router-link></li>
      <li v-on:click="deleteData()"><span><span class="material-icons-round">delete</span>Delete data</span></li>
    </ul>
  </page>`,
  components: {
    Page
  },
  methods: {
    changeTheme() {
      const ComponentClass = Vue.extend(ModalTheme)
      const instance = new ComponentClass()
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    resetHelp() {
      ['help_overview', 'help_calendar', 'help_analytics'].forEach(key => {
        localStorage.removeItem(key)
      })
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Reset Tutorial Dialogs',
          message: 'The dialogs have been reset successfully.',
          negativeButton: false
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    clearCache() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Clear Cache',
          message: 'Are you sure you want to clear your cache? This cannot be undone.',
          positiveText: 'Clear',
          positiveFunction: () => {
            caches.keys().then(names => {
              for (const name of names) caches.delete(name)
              location.reload()
            })
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    deleteData() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Delete Data',
          message: 'Are you sure you want to delete your data? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            localStorage.clear()
            location.reload()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
