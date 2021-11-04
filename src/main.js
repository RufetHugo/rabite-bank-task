import Vue from 'vue'

/* Vue Router */
import VueRouter from "vue-router"
import { router } from "@/router";
Vue.use(VueRouter)

/* Vue Axios */
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'https://fakestoreapi.com/';

/* Vue Store */
import { store } from "@/store";

/* Vue Bootstrap */
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
Vue.use(BootstrapVue).use(IconsPlugin)

import App from './App.vue'
import '@/assets/global.css'
import global from '@/plugins/global'

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  global,
  render: h => h(App),
}).$mount('#app')


