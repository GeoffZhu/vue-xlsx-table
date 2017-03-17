import Vue from 'vue'
import App from './App.vue'

import vueXLSX from '../src/'
// import vueXLSX from '../dist'
// import '../dist/style.css'

Vue.use(vueXLSX)

new Vue({
  el: '#app',
  render: h => h(App)
})
