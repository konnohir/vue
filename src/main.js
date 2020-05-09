import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import qs from 'qs';

import "@/assets/common.scss";
import AppLayout from '@/pages/AppLayout.vue'
import HomesIndex from '@/pages/Homes/index.vue'
import HomesLogin from '@/pages/Homes/login.vue'
import HomesLogout from '@/pages/Homes/logout.vue'
import HomesProfile from '@/pages/Homes/profile.vue'
import HomesPassword from '@/pages/Homes/password.vue'
import UsersIndex from '@/pages/Users/index.vue'
import UsersEdit from '@/pages/Users/edit.vue'

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.use(VueRouter);
Vue.use(Vuex)
Vue.use(BootstrapVue)

// ルーティング
const vueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: HomesIndex },
    { path: '/login', component: HomesLogin },
    { path: '/logout', component: HomesLogout },
    { path: '/profile', component: HomesProfile },
    { path: '/password', component: HomesPassword },
    { path: '/users', component: UsersIndex },
    { path: '/users/add', component: UsersEdit },
    { path: '/users/edit/:id', component: UsersEdit },
    { path: '*', component: { render: h => h('div', 'error') } },
  ],
  parseQuery(query) {
    return qs.parse(query);
  },
  stringifyQuery(query) {
    const filteredQuery = {};
    Object.keys(query).forEach(key => {
      const value = query[key];
      if (
        value === "" ||
        value === false ||
        value === null ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return;
      }
      filteredQuery[key] = query[key];
    });
    var result = qs.stringify(filteredQuery);
    return result ? ('?' + result) : '';
  }
});

// データストア
const excute = {
  state: {
    isExcute: false,
  },
  mutations: {
    setExcute(state, isExcute) {
      state.isExcute = isExcute;
    }
  },
  getters: {
    isExcute: state => {
      return state.isExcute;
    },
  }
}
const flash = {
  state: {
    message: null,
    varient: null,
  },
  mutations: {
    info(state, message) {
      state.message = message;
      state.varient = "info";
    },
    error(state, message) {
      state.message = message;
      state.varient = "error";
    }
  },
  getters: {
    flashMessage: state => {
      return state.message;
    },
  }
}
const identity = {
  state: {
    identity: JSON.parse(localStorage.getItem('identity'))
  },
  mutations: {
    setIdentity(state, identity) {
      state.identity = identity;
      if (identity) {
        localStorage.setItem('identity', JSON.stringify(identity));
      } else {
        localStorage.removeItem('identity');
      }
    }
  },
  getters: {
    identity: state => {
      return state.identity;
    },
    isLoggedIn: state => {
      return (state.identity !== null);
    },
  },
  actions: {
    /**
     * ログイン
     */
    async login(context, token) {
      context.commit('setExcute', true)
      const identity = await new Promise(resolve =>
        setTimeout(
          () =>
            resolve({
              email: token.email || "user01@example.com",
              role_id: token.role_id || 1
            }),
          300
        )
      )
      if (identity) {
        context.commit('setIdentity', identity)
      }
      context.commit('setExcute', false)
      return identity;
    },
    /**
     * ログアウト
     */
    async logout(context) {
      context.commit('setIdentity', null)
      await new Promise(resolve =>
        setTimeout(
          () =>
            resolve(),
          300
        )
      )
    }
  }
}
const api = {
  actions: {
    /**
     * GETメソッド
     */
    async get(context, data) {
      console.log("%cGET", "background:orange", data.url);
      if (data.url==='/users') {
        const users = [
          {
            id: 1,
            email: (vueRouter.currentRoute.query.email || "user01") + "@example.com",
            role: {
              name: "管理者"
            },
            password_issue: true,
            login_failed_count: 0
          },
          {
            id: 2,
            email: ("user02") + "@example.com",
            role: {
              name: "管理者"
            },
            password_issue: false,
            login_failed_count: 0
          }
        ];
        const totalRows = users.length * 100
        return {
          users,
          totalRows,
        }
      }else {
        return {
          user: {
            email: data.url,
            role_id: 1,
          }
        }
      }
    },
  }
}
const vueStore = new Vuex.Store({
  modules: [identity, api, excute, flash]
})

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
