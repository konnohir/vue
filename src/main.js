import Vue from 'vue'
import VueRouter from 'vue-router'

import axios from 'axios'

import AppLayout from '@/views/AppLayout.vue'
import HomesIndex from '@/views/Homes/index.vue'
import HomesLogin from '@/views/Homes/login.vue'
import HomesProfile from '@/views/Homes/profile.vue'

Vue.config.productionTip = false;
Vue.use(VueRouter);
axios.interceptors.request.use(function (config) {
  if (typeof config.params === 'undefined') {
    config.params = {};
  }
  if (typeof config.params === 'object') {
    if (typeof URLSearchParams === 'function' && config.params instanceof URLSearchParams)
      config.params.append('_', Date.now());
    else
      config.params._ = Date.now();
  }

  return config;
});
const VueSession = {
  install: (Vue) => {
    Object.defineProperty(Vue.prototype, '$session', {
      get() { return VueSession }
    })
  },

  isLoggedIn: function () {
    return (this.user !== null);
  },

  user: null,
  csrfToken: null,

  login: async function (email, password) {
    // セッションID、CSRFトークン取得
    const response1 = await axios.get('http://localhost:8765/login', {
      withCredentials: true

    })

    const cookie = document.cookie.split(';').reduce((accumulator, currentValue) => {
      const [key, value] = currentValue.split('=');
      accumulator[key] = value
      return accumulator;
    }, {});

    const response = await axios.post('http://localhost:8765/login', {
      email,
      password,
      _csrfToken: cookie['csrfToken'],
    }, {
      withCredentials: true
    })

    console.log(response.data);

    if (response.data.status === "ok") {
      this.user = response.data.user;
      return true;
    }

    return false;
  },

  logout: async (to, from, next) => {
    const response1 = await axios.get('http://localhost:8765/logout', {
      withCredentials: true
    });
    VueSession.user = null;
    next('/login');
  }

}
Vue.use(VueSession);

// ルーティング
const vueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: HomesIndex },
    { path: '/login', component: HomesLogin },
    { path: '/logout', beforeEnter: VueSession.logout },
    { path: '/profile', component: HomesProfile },
    { path: '*', component: { render: h => h('div', 'error') } },
  ]
});

// 認証
vueRouter.beforeEach((to, from, next) => {
  console.debug(to);
  if (to.matched.some(record => record.path !== '/login')) {
    if (!VueSession.isLoggedIn()) {
      return next('/login');
    }
  }
  next();
});

// 認可
vueRouter.beforeEach((to, from, next) => {
  next();
});

new Vue({
  router: vueRouter,
  render: h => h(AppLayout)
}).$mount('#app');

window.addEventListener('message', function onWebpackMessage(e) {
  console.clear();
});