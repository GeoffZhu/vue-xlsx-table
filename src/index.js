'use strict'

import vueXlsxTable from './vue-xlsx-table.vue'

function install (Vue, options = {}) {
  const version = Vue.version.split('.')[0]
  if (version !== '2') {
    console.error('For Vue.js 2, Version not support.')
  }
  const inBrowser = typeof window !== 'undefined'
  const DEFAULT_OPTION = {
    locale: 'zh' //en
  }
  let xlsx = {
    $vm: null,
    bindEventBus (vm) {
      this.$vm = vm
    }
  }

  const calendarOptions = Object.assign(DEFAULT_OPTION, options)

  const VueCalendarBarEventBus = new Vue({
    data: {
      CALENDAR_EVENTS_DATA: {
        options: calendarOptions,
        params: {
        }
      }
    }
  })

  if (inBrowser) {
    // window.VueCalendarBarEventBus = VueCalendarBarEventBus
    // Calendar.bindEventBus(VueCalendarBarEventBus)
  }

  Vue.component('vue-xlsx-table', vueXlsxTable)

  // Vue.prototype.$EventCalendar = Calendar
}

export default install

if (typeof module === 'object' && module.exports) {
  module.exports.install = install
}