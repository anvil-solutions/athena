/*global Vue, VueRouter*/

import JsonHelper from './helpers/json.js'
import NotificationHelper from './helpers/notifications.js'

const Unknown = () => import('./pages/unknown.js')

const Overview = () => import('./pages/main/overview.js')
const Calendar = () => import('./pages/main/calendar.js')
const Analytics = () => import('./pages/main/analytics.js')
const Account = () => import('./pages/main/account.js')

const Day = () => import('./pages/day.js')

const Symptoms = () => import('./pages/symptoms.js')
const Note = () => import('./pages/note.js')
const Medications = () => import('./pages/medications.js')
const MedicationDetails = () => import('./pages/medication-details.js')

const Cycle = () => import('./pages/cycle.js')
const CycleDetails = () => import('./pages/cycle-details.js')

const AppSettings = () => import('./pages/app-settings.js')
const ErrorLog = () => import('./pages/log.js')
const BackupAndRestore = () => import('./pages/backup-and-restore.js')
const Help = () => import('./pages/help.js')
const About = () => import('./pages/about.js')

if (/iPhone/.test(navigator.platform)) {
  const link = document.createElement('link')
  link.href = './css/ios.min.css'
  link.type = 'text/css'
  link.rel = 'stylesheet'
  document.getElementsByTagName('head')[0].appendChild(link)
}

const routes = [
  { path: '/', redirect: '/overview' },
  { path: '*', component: Unknown },
  { path: '/overview', component: Overview },
  { path: '/calendar', component: Calendar },
  { path: '/day', component: Day },
  { path: '/symptoms', component: Symptoms },
  { path: '/note', component: Note },
  { path: '/medications', component: Medications },
  { path: '/medications/details', component: MedicationDetails },
  { path: '/analytics', component: Analytics },
  { path: '/analytics/cycle', component: Cycle },
  { path: '/analytics/cycle/details', component: CycleDetails },
  { path: '/account', component: Account },
  { path: '/account/app', component: AppSettings },
  { path: '/account/app/log', component: ErrorLog },
  { path: '/account/backup-and-restore', component: BackupAndRestore },
  { path: '/account/help', component: Help },
  { path: '/account/about', component: About }
]

function logError(e, pos) {
  const errors = JsonHelper.get('errors', () => [])
  errors.push(e.message + ' at ' + pos)
  JsonHelper.set('errors', errors)
}
window.addEventListener('error', e => {
  logError(e, e.filename?.replace(/.*\/\/[^/]*/, '') + ':' + e.lineno)
})
Vue.config.errorHandler = (e, vm, info) => {
  console.error(e)
  logError(e, vm.$vnode.tag + ':' + info)
}

var headers, i
document.addEventListener('scroll', () => {
  headers = document.getElementsByTagName('HEADER')
  for (i = 0; i < headers.length; i++) {
    headers[i].classList.toggle('header-shadow', window.pageYOffset > 0)
  }
})

window.encrypt = async input => {
  return Array.from(
    new Uint8Array(
      await crypto.subtle.digest('SHA-256',new TextEncoder().encode(input))
    )
  ).map(b => b.toString(16).padStart(2, '0')).join('')
}
window.checkHostname = async () => {
  const hostname = await window.encrypt(location.hostname)
  return hostname == '49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d9763'
    || hostname == '711fa4f04d918304fbf850be484fbe4ecef06d32883158638b568c75db5e0d24'
}

let modal
window.activityStack = ['/overview']
window.backButtonPress = false
window.addEventListener('popstate', () => {
  window.backButtonPress = true
})

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  modal = document.querySelector('.modal-container')
  if (modal != null) {
    modal.parentNode.removeChild(modal)
    next(false)
    return
  }

  if (window.backButtonPress) {
    window.backButtonPress = false
    if (window.activityStack.length > 1) window.activityStack.pop()
    next(window.activityStack[window.activityStack.length - 1])
  } else {
    const index = window.activityStack.indexOf(to.fullPath)
    if (index == -1) window.activityStack.push(to.fullPath)
    else window.activityStack.length = index + 1
    next()
  }
})

const app = new Vue({
  router,
  el: '#app',
  mounted() {
    const loadingScreen = document.getElementById('loading_screen')
    window.checkHostname().then(result => {
      if (result) loadingScreen.parentNode.removeChild(loadingScreen)
    })

    let darkTheme = null
    switch (localStorage.getItem('theme')) {
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
  }
})

//NotificationHelper.updatePendingNotifications()

if (location.hostname == 'localhost') {
  Vue.config.devtools = true
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor
}
