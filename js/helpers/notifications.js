/*global TimestampTrigger*/

import Medications from './medications.js'
import CycleHelper from './cycle.js'

let notifications = []

function addNotification(timestamp, title, body) {
  notifications.push([
    title,
    {
      tag: timestamp,
      body: body,
      //TODO: Wait for web API to become standard
      //showTrigger: new TimestampTrigger(timestamp),
      data: {
        url: window.location.href
      },
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      icon: './pwa/mipmap-xxxhdpi/ic_launcher.png',
    }
  ])
}

export default {
  async updatePendingNotifications() {
    notifications = []
    let timestamp = new Date().getTime()
    Medications.get().forEach(item => {
      if (item.reminder) {
        timestamp++
        addNotification(
          timestamp,
          'Medication',
          'Don\'t forget to take "' + item.title + '" at ' + item.time + '.'
        )
      }
    })
    const nextPeriod = (new CycleHelper).getStats().nextPeriodDays
    if (nextPeriod == 1) {
      timestamp++
      addNotification(
        timestamp,
        'Period Update',
        'Your period will arrive tomorrow!'
      )
    }
    const reg = await navigator.serviceWorker.getRegistration()
    Notification.requestPermission().then(permission => {
      if (permission == 'granted') {
        notifications.forEach(item => {
          reg.showNotification(...item)
        })
      }
    })
  }
}
