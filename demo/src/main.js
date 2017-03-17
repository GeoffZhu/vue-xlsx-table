import Vue from 'vue'
import App from './App.vue'

import 'vue-xlsx-table/dist/style.css'
import vueXlsxTable from 'vue-xlsx-table'

Vue.use(vueXlsxTable)

new Vue({
  el: '#app',
  render: h => h(App)
})
