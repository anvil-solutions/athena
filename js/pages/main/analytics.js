import PageTabBar from '../../components/page-tab-bar.js'

//TODO: Actual List Data

export default {
  name: 'analytics',
  template:
  `<page-tab-bar>
    <h2 class="text-center h3 mt-0 mb-16">Your average cycle length is 0 days</h2>
    <div v-for="index in 6" :key="index" class="card p-16 red mb-16">
      <p class="m-0">0 days <small>Jan 1st - Jan 1st</small></p>
      <progress value="6" max="31"></progress>
    </div>
  </page-tab-bar>`,
  components: {
    PageTabBar
  }
}
