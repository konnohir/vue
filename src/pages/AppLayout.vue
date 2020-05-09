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
     * 現在表示している画面のURL
     */
    currentPage() {
      return this.$route.matched[0].path;
    },
    /**
     * ログイン画面のURL
     */
    loginPage() {
      if (this.currentPage.length > 1 && this.currentPage !== "/logout") {
        // URLに「?redirect=」を付与する（トップページ、ログアウトページ、存在しないページ[*]をのぞく）
        return "/login?redirect=" + this.currentPage
      }
      return "/login";
    },
    /**
     * ホーム画面のURL
     */
    homePage() {
      // URLの「?redirect=」 に続く文字列を取得
      const redirectPage = this.$router.resolve(this.$route.query.redirect || '/').route.matched[0].path;
      if (redirectPage.length > 1 && redirectPage !== "/login") {
        // 遷移先をリダイレクト先のURLにする（ログインページ、存在しないページ[*]をのぞく）
        return redirectPage;
      }
      return "/";
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
      if (!this.isLoggedIn && this.currentPage !== "/login") {
        this.$router.push(this.loginPage);
      }

      // ログイン済みならホーム画面(?redirect=があれば該当ページ)へ遷移する
      if (this.isLoggedIn && this.currentPage === "/login") {
        this.$router.push(this.homePage);
      }
    }
  }
};
</script>
