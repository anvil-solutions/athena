import PageTabBar from '../../components/page-tab-bar.js'

//TODO: Actual List Data

export default {
  name: 'analytics',
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
    <router-link v-for="index in 6" :key="index" to="/analytics/cycle" class="card p-16 red mb-16">
      <p class="m-0">0 days <small>Jan 1st - Jan 1st</small></p>
      <progress value="6" max="31"></progress>
    </router-link>
    <router-link to="/analytics/cycle/details" class="block p-2 text-center">
      <span class="p text-center">Add previous cycle</span>
    </router-link>
  </page-tab-bar>`,
  components: {
    PageTabBar
  }
}
