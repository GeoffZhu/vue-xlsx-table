import Vue from 'vue'
import App from './App.vue'

import vueXlsxTable from 'vue-xlsx-table'

Vue.use(vueXlsxTable)

new Vue({
  el: '#app',
  render: h => h(App)
})
