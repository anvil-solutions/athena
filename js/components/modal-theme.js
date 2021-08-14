//TODO: Replace with generic modal

export default {
  name: 'modal-theme',
  template:
  `<div class="modal-container">
    <div class="modal-background" v-on:click="close()"></div>
    <div class="modal-content card">
      <h2>Change Theme</h2>
      <p>Switch to a theme you prefer</p>
      <div class="flex space">
        <button v-on:click="setTheme('auto')" type="button">Auto</button>
        <button v-on:click="setTheme('light')" type="button">Light</button>
        <button v-on:click="setTheme('dark')" type="button">Dark</button>
      </div>
      <div class="button-bar">
        <button v-on:click="close()" type="button">Ok</button>
      </div>
    </div>
  </div>`,
  methods: {
    setTheme(theme) {
      localStorage.setItem('theme', theme)
      let darkTheme = null
      switch (theme) {
        case 'light':
          darkTheme = false
          break
        case 'dark':
          darkTheme = true
          break
        default:
          darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          break
      }
      document.documentElement.classList.toggle('dark-theme', darkTheme)

      const metaColor = document.querySelector('meta[name=theme-color]')
      if (darkTheme) metaColor.setAttribute('content', '#1e1e1e')
      else metaColor.setAttribute('content', '#fff')
    },
    close() {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
