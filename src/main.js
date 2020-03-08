import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import "@/assets/common.scss";
import AppLayout from '@/views/AppLayout.vue'
import HomesIndex from '@/views/Homes/index.vue'
import HomesLogin from '@/views/Homes/login.vue'
import HomesProfile from '@/views/Homes/profile.vue'
import UsersIndex from '@/views/Users/index.vue'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex)
Vue.use(BootstrapVue)

// データストア
const vueStore = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    isLoggedIn: state => {
      return (state.user !== null);
    },
  }
})

// ルーティング
const vueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: HomesIndex },
    { path: '/login', component: HomesLogin },
    { path: '/profile', component: HomesProfile },
    { path: '/users', component: UsersIndex },
    { path: '*', component: { render: h => h('div', 'error') } },
  ],
});

// コンポーネント
const components = require.context('@/components', false, /\.vue$/);
components.keys().forEach(key => {
  Vue.component(key.replace(/(\.\/|\.vue)/g, ''), components(key).default);
});

new Vue({
  router: vueRouter,
  store: vueStore,
  render: h => h(AppLayout)
}).$mount('#app');
