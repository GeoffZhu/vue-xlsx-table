'use strict'

import vueXlsxTable from './vue-xlsx-table.vue'

function install (Vue, options = {}) {
  const version = Vue.version.split('.')[0]
  if (version !== '2') {
    console.error('For Vue.js 2, Version not support.')
  }
  const inBrowser = typeof window !== 'undefined'
  const DEFAULT_OPTION = {
    rABS: false
  }
  let xlsx = {
    $vm: null,
    bindEventBus (vm) {
      this.$vm = vm
    }
  }

  const xlsxOptions = Object.assign(DEFAULT_OPTION, options)

  const xlsxEventBus = new Vue({
    data: {
      XLSX_EVENTS_DATA: {
        options: xlsxOptions,
        params: {
        }
      }
    }
  })

  if (inBrowser) {
    window.xlsxEventBus = xlsxEventBus
    xlsx.bindEventBus(xlsxEventBus)
  }

  Vue.component('vue-xlsx-table', vueXlsxTable)
}

export default install

if (typeof module === 'object' && module.exports) {
  module.exports.install = install
}