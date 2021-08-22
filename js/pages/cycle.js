import Page from '../components/page.js'

import CycleHelper from '../helpers/cycle.js'

export default {
  name: 'cycle-details',
  data() {
    return {
      symptoms: ['a', 'b'],
      notes: ['a', 'b'],
      cycle: {},
      dateString: [undefined, { month: 'short', day: 'numeric' }]
    }
  },
  template:
  `<page title="Cycle">
    <div class="card p-16 red mb-16">
      <p class="m-0">
        {{ cycle.days }} days
        <small>{{ (new Date(cycle.start)).toLocaleDateString(...dateString) }} - {{ (new Date(cycle.end)).toLocaleDateString(...dateString) }}</small>
      </p>
      <progress :value="cycle.periodEnd - cycle.start" :max="cycle.end - cycle.start"></progress>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Symptoms</h3>
      <ul class="link-list m-0">
        <li v-for="(item, i) in symptoms" :key="'s' + i">
          <span><span class="material-icons-round">healing</span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Notes</h3>
      <ul class="link-list m-0">
        <li v-for="(item, i) in notes" :key="'n' + i">
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
      this.$router.push('/analytics/cycle/details?i=' + this.$route.query.i)
    }
  },
  created() {
    this.cycle = (new CycleHelper()).getCycles()[this.$route.query.i]
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
