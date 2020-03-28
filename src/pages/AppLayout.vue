<template>
  <div id="app">
    <!-- グローバルメニュー -->
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-brand to="/">BaseEnv4</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav v-if="identify">
        <!-- Left aligned nav items -->
        <b-navbar-nav>
          <b-nav-item to="/users">Users</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/profile">{{identify.email}}</b-nav-item>
          <b-nav-item to="/logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- メインコンテンツ -->
    <b-container fluid tag="main" class="py-3">
      <router-view v-if="isReady" @login="login" @logout="logout" />
    </b-container>
    <!-- フッター -->
    <footer class="fixed-bottom border-top">
      <p class="text-center">© 2020 footer</p>
    </footer>
  </div>
</template>

<script>
export default {
  /**
   * データ
   */
  data() {
    return {
      /**
       * 初期化完了フラグ
       * trueならメインコンテンツが表示される
       */
      isReady: false
    };
  },
  /**
   * 算出プロパティ
   */
  computed: {
    /**
     * ログイン中のユーザー
     */
    identify() {
      return this.$store.getters.identify;
    },
    /**
     * ログイン済み判定
     */
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    /**
     * ログイン画面のURL
     */
    loginPage() {
      // 現在のページのURLを取得
      const redirectTo = this.$route.matched[0].path;
      if (redirectTo === "" || redirectTo === "/logout" || redirectTo === "*") {
        // トップページ、ログアウトページ、または存在しないページなら「?redirect=」を付与しない
        return "/login";
      }
      return "/login?redirect=" + redirectTo;
    },
    /**
     * ログイン後遷移先のURL
     */
    redirectPage() {
      // URLの「?redirect=」 に続く文字列を取得
      const redirectTo = this.$route.query.redirect || "/";
      if (redirectTo === "login" || redirectTo === "/login") {
        // ログイン画面のURLが指定されている場合、トップページのURLに置き換える
        return "/";
      }
      return redirectTo;
    }
  },
  /**
   * 初期化フック
   */
  async created() {
    // 未ログインならログイン画面を表示する
    if (!this.isLoggedIn && this.$route.matched[0].path !== "/login") {
      this.$router.push(this.loginPage);
    }

    // ログイン済みならトップ画面を表示する
    if (this.isLoggedIn && this.$route.matched[0].path === "/login") {
      this.$router.push(this.redirectPage);
    }

    // メインコンテンツを表示する
    this.isReady = true;
  },
  /**
   * イベント
   */
  methods: {
    /**
     * ログイン
     */
    async login(token) {
      const identify = await loginApi(token);
      if (identify) {
        this.$store.commit("setIdentify", identify);
        this.$router.push(this.redirectPage);
      }
    },
    /**
     * ログアウト
     */
    async logout() {
      this.$store.commit("setIdentify", null);
      this.$router.push(this.loginPage);
    }
  }
};

function loginApi(identify) {
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          email: identify.email || "user01@example.com",
          role_id: identify.role_id || 1
        }),
      300
    )
  );
}
</script>
