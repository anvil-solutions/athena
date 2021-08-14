export default {
  name: 'icon-item',
  props: {
    icon: String,
    title: String,
    summary: String,
    link: {
      type: String,
      default: ''
    }
  },
  template:
  `<router-link :to="link" class="card p-16 flex center text-start">
    <div class="material-icons-round big-c-icon">{{ icon }}</div>
    <div>
      <h3 class="m-0 mt-2">{{ title }}</h3>
      <p class="mb-6">{{ summary }}</p>
    </div>
  </router-link>`
}
