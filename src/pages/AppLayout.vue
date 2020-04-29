<template>
  <div id="app">
    <!-- グローバルメニュー -->
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-brand to="/">BaseEnv4</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav v-if="identity">
        <!-- Left aligned nav items -->
        <b-navbar-nav>
          <!-- ユーザー -->
          <b-nav-item to="/users">Users</b-nav-item>
          <!-- 権限 -->
          <b-nav-item to="/roles">Roles</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/profile">{{identity.email}}</b-nav-item>
          <b-nav-item to="/logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- メインコンテンツ -->
    <main class="container-fluid py-3 mb-5">
      <router-view @onIdentityUpdated="onIdentityUpdated" />
    </main>
    <!-- フッター -->
    <footer class="fixed-bottom border-top">
      <p class="text-center">© 2020 footer</p>
    </footer>
  </div>
</template>

<script>
/**
 * アプリケーション共通レイアウト
 */
export default {
  /**
   * 算出プロパティ
   */
  computed: {
    /**
     * ログインユーザー情報
     */
    identity() {
      return this.$store.getters.identity;
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
     * ログイン後遷移先画面のURL
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
  created() {
    this.onIdentityUpdated();
  },
  /**
   * イベント
   */
  methods: {
    /**
     * ログイン状態を確認し、ページを遷移する
     */
    onIdentityUpdated() {
      // 未ログインならログイン画面へ遷移する
      if (!this.isLoggedIn && this.$route.matched[0].path !== "/login") {
        this.$router.push(this.loginPage);
      }

      // ログイン済みならトップ画面(?redirect=があれば該当ページ)へ遷移する
      if (this.isLoggedIn && this.$route.matched[0].path === "/login") {
        this.$router.push(this.redirectPage);
      }
    }
  }
};
</script>
