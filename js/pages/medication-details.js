import Page from '../components/page.js'

//TODO: Add, edit, delete medication

export default {
  name: 'medication-details',
  data() {
    return {
      title: ''
    }
  },
  template:
  `<page title="Medication">
    <div class="text-center"><span class="very-big accent material-icons-round mb-16">medication</span></div>
    <label for="title">Title</label>
    <input id="title" v-model="title" class="mb-16" type="text" autocomplete="off"></input>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">done</div>
  </page>`,
  components: {
    Page
  },
  methods: {
    onFabClicked() {
      this.$router.push('')
    }
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
