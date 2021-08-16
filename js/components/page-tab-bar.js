export default {
  name: 'page-tab-bar',
  data() {
    return {
      tabs: [
        {
          icon: 'home',
          title: 'Overview',
          url: '/overview'
        },
        {
          icon: 'event',
          title: 'Calendar',
          url: '/calendar'
        },
        {
          icon: 'leaderboard',
          title: 'Calendar',
          url: '/analytics'
        },
        {
          icon: 'account_circle',
          title: 'Account',
          url: '/account'
        }
      ]
    }
  },
  template:
  `<div>
    <header>
      <h1>Athena</h1>
    </header>
    <main class="with app-bar tab-bar fade-in-animation">
      <slot></slot>
    </main>
    <footer>
      <router-link class="tab" v-for="tab in tabs" :key="tab.url" :to="tab.url">
        <span class="material-icons-round" :aria-label="tab.title">{{ tab.icon }}</span>
      </router-link>
    </footer>
  </div>`
}
