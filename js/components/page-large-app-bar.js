export default {
  name: 'page-large-app-bar',
  props: {
    title: String,
    imgId: {
      type: String,
      default: ''
    }
  },
  template:
  `<div class="large-app-bar">
    <header>
      <router-link :to="window.activityStack[window.activityStack.length - 2]">
        <span class="material-icons-round transparent nav-icon" aria-label="Back">arrow_back</span>
      </router-link>
    </header>
    <h2 class="large-app-bar" :style="imgId != '' ? 'background: var(--background-dim), url(./images/unsplash/' + imgId + '.jpg) no-repeat center/cover;' : ''">{{ title }}</h2>
    <main class="large-app-bar zoom-in-animation">
      <slot></slot>
    </main>
  </div>`
}
