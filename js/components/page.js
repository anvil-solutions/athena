export default {
  name: 'page',
  props: {
    title: String
  },
  template:
  `<div>
    <header>
      <router-link :to="window.activityStack[window.activityStack.length - 2]">
        <span class="material-icons-round nav-icon" role="button" aria-label="Back">arrow_back</span>
      </router-link>
      <h1 class="with-nav-icon">{{ title }}</h1>
    </header>
    <main class="with app-bar zoom-in-animation">
      <slot></slot>
    </main>
  </div>`
}
