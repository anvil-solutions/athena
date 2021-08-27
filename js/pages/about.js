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
    <ul>
      <li>Material Icons Round</li>
      <li>Vue Router</li>
      <li>Vue.js</li>
    </ul>
    <h2 class="mt-16">Legal</h2>
    <p>Copyright 2021<br>Domi04151309 & Nils Döhring</p>
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
