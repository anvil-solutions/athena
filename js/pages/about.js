import Page from '../components/page.js'

export default {
  name: 'about',
  data() {
    return {
      version: 'unknown'
    }
  },
  template:
  `<page title="About">
    <div class="text-center">
      <img src="./images/about/logo.svg" alt="Icon">
      <h2>Athena</h2>
      <p>{{ version }}</p>
      <p>
        Your personal period, cycle, and symptom tracker.
      </p>
    </div>
    <h2 class="mt-16">Libraries</h2>
    <div class="grid-1-2 gap-16">
      <a rel="nofollow noopener noreferrer" target="_blank" href="https://www.apache.org/licenses/LICENSE-2.0.txt" class="card p-16">
        <h3>Material Icons</h3>
        <p>Apache License 2.0</p>
      </a>
      <a rel="nofollow noopener noreferrer" target="_blank" href="https://raw.githubusercontent.com/vuejs/vue-router/dev/LICENSE" class="card p-16">
        <h3>Vue Router</h3>
        <p>MIT License</p>
      </a>
      <a rel="nofollow noopener noreferrer" target="_blank" href="https://raw.githubusercontent.com/vuejs/vue/dev/LICENSE" class="card p-16">
        <h3>Vue.js</h3>
        <p>MIT License</p>
      </a>
    </div>
    <h2 class="mt-16">Legal</h2>
    <p>Copyright 2021<br>Dominik Reichl & Nils Döhring</p>
  </page>`,
  components: {
    Page
  },
  methods: {
    async getVersion() {
      this.version = (await window.caches.keys())[0]
    }
  },
  created() {
    this.getVersion()
  }
}
