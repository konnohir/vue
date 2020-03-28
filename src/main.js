import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import "@/assets/common.scss";
import AppLayout from '@/pages/AppLayout.vue'
import HomesIndex from '@/pages/Homes/index.vue'
import HomesLogin from '@/pages/Homes/login.vue'
import HomesLogout from '@/pages/Homes/logout.vue'
import HomesProfile from '@/pages/Homes/profile.vue'
import UsersIndex from '@/pages/Users/index.vue'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex)
Vue.use(BootstrapVue)

// データストア
const excute = {
  state: {
    isExcute: false,
  },
  mutations: {
    setExcute(state, isExcute) {
      console.log(isExcute)
      state.isExcute = isExcute;
    }
  },
  getters: {
    isExcute: state => {
      return state.isExcute;
    },
  }
}
const identify = {
  state: {
    identify: JSON.parse(localStorage.getItem('identify'))
  },
  mutations: {
    setIdentify(state, identify) {
      state.identify = identify;
      if (identify) {
        localStorage.setItem('identify', JSON.stringify(identify));
      } else {
        localStorage.removeItem('identify');
      }
    }
  },
  getters: {
    identify: state => {
      return state.identify;
    },
    isLoggedIn: state => {
      return (state.identify !== null);
    },
  }
}
const vueStore = new Vuex.Store({
  modules: [identify, excute]
})

// ルーティング
const vueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: HomesIndex },
    { path: '/login', component: HomesLogin },
    { path: '/logout', component: HomesLogout },
    { path: '/profile', component: HomesProfile },
    { path: '/users', component: UsersIndex },
    { path: '*', component: { render: h => h('div', 'error') } },
  ],
});

// コンポーネント
const components = require.context('@/components', true, /\.vue$/);
components.keys().forEach(key => {
  Vue.component(key.replace(/.*\/(.*?).vue/g, '$1'), components(key).default);
});

new Vue({
  router: vueRouter,
  store: vueStore,
  render: h => h(AppLayout)
}).$mount('#app');
