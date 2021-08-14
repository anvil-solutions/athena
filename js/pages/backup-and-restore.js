/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

export default {
  name: 'backup-and-restore',
  template:
  `<page title="Backup And Restore">
    <ul class="link-list ignore-page-padding">
      <li v-on:click="backup()"><span><span class="material-icons-round">cloud_download</span>Backup</span></li>
      <li v-on:click="restore()"><span><span class="material-icons-round">cloud_upload</span>Restore</span></li>
    </ul>
    <a id="download" class="hidden"></a>
    <input id="file" type="file" accept=".json" class="hidden" />
  </page>`,
  components: {
    Page
  },
  methods: {
    backup() {
      const data = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(localStorage))
      const element = document.getElementById('download')
      element.setAttribute('href', data)
      element.setAttribute('download', 'athena-' + (new Date()).toISOString() + '.json')
      element.click()
    },
    restore() {
      const element = document.getElementById('file')
      element.onchange = e => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.readAsText(file, 'UTF-8')
          reader.onload = evt => {
            const ComponentClass = Vue.extend(Modal)
            const instance = new ComponentClass({
              propsData: {
                title: 'Restore Data',
                message: 'Are you sure you want to restore from this file? This will delete all your existing data and cannot be undone.',
                positiveText: 'Restore',
                positiveFunction: () => {
                  const data = JSON.parse(evt.target.result)
                  localStorage.clear()
                  Object.keys(data).forEach(key => { localStorage.setItem(key, data[key])})
                  location.reload()
                }
              }
            })
            instance.$mount()
            this.$root.$el.appendChild(instance.$el)
          }
          reader.onerror = () => {
            this.error()
          }
        } else {
          this.error()
        }
      }
      element.click()
    },
    error() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Something Went Wrong',
          message: 'Please try again'
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
