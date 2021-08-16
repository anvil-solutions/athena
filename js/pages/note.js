import Page from '../components/page.js'

//TODO: Edit, Save Notes

export default {
  name: 'note',
  data() {
    return {
      note: ''
    }
  },
  template:
  `<page title="Note">
    <div class="text-center"><span class="very-big accent material-icons-round mb-16">sticky_note_2</span></div>
    <p class="text-center mt-0 mb-16">Enter your note in the text field below.</p>
    <textarea rows="50" v-model="note" aria-label="Note" autocomplete="off"></textarea>
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
