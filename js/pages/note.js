import Page from '../components/page.js'

import DayHelper from '../helpers/day.js'

export default {
  name: 'note',
  data() {
    return {
      helper: {},
      index: 0,
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
      this.helper.data.notes[this.index] = this.note
      this.helper.saveData()
      this.$router.push(this.$route.query.date ? '/day?date=' + this.$route.query.date : '/day')
    }
  },
  created() {
    this.helper = new DayHelper(this.$route.query.date)
    this.index = this.$route.query.i || this.helper.data.notes.length
    this.note = this.helper.data.notes[this.index]
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
