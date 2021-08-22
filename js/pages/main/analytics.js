import PageTabBar from '../../components/page-tab-bar.js'

import CycleHelper from '../../helpers/cycle.js'

export default {
  name: 'analytics',
  data() {
    return {
      cycles: (new CycleHelper).getCycles().reverse(),
      dateString: [undefined, { month: 'short', day: 'numeric' }]
    }
  },
  template:
  `<page-tab-bar>
    <div class="card p-16 mb-16">
      <div class="flex between center mb-8">
        <p class="m-0">0 days</p><p class="m-0">Average Cycle Length</p>
      </div>
      <div class="flex between center">
        <p class="m-0">0 days</p><p class="m-0">Average Period Length</p>
      </div>
    </div>
    <router-link v-for="(item, i) in cycles" :key="i" :to="'/analytics/cycle?i=' + (cycles.length - i - 1)" class="card p-16 red mb-16">
      <p class="m-0">
        {{ item.days }} days
        <small>{{ (new Date(item.start)).toLocaleDateString(...dateString) }} - {{ (new Date(item.end)).toLocaleDateString(...dateString) }}</small>
      </p>
      <progress :value="item.periodEnd - item.start" :max="item.end - item.start"></progress>
    </router-link>
    <router-link to="/analytics/cycle/details" class="block p-2 text-center">
      <span class="p text-center">Add previous cycle</span>
    </router-link>
  </page-tab-bar>`,
  components: {
    PageTabBar
  }
}
