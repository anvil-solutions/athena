import Page from '../components/page.js'

export default {
  name: 'cycle-details',
  data() {
    return {
      helper: {
        data: {
          symptoms: ['a', 'b'],
          notes: ['a', 'b']
        }
      }
    }
  },
  template:
  `<page title="Cycle">
    <div class="card p-16 red mb-16">
      <p class="m-0">0 days <small>Jan 1st - Jan 1st</small></p>
      <progress value="6" max="31"></progress>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Symptoms</h3>
      <ul class="link-list m-0">
        <li v-for="(item, i) in helper.data.symptoms" :key="'s' + i">
          <span><span class="material-icons-round">healing</span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Notes</h3>
      <ul class="link-list m-0">
        <li v-for="(item, i) in helper.data.notes" :key="'n' + i">
          <span><span class="material-icons-round">sticky_note_2</span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">edit</div>
  </page>`,
  components: {
    Page
  },
  methods: {
    onFabClicked() {
      this.$router.push('/analytics/cycle/details')
    }
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
