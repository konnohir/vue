<template>
  <section>
    <form>
      <!-- メールアドレス -->
      <my-input type="text" autocomplete="username" placeholder="email" v-model="email" />
      <!-- パスワード -->
      <my-input
        type="password"
        autocomplete="current-password"
        placeholder="password"
        v-model="password"
      />
      <!-- ログイン -->
      <my-button type="submit" variant="success" block @click.prevent="doLogin">Login</my-button>
    </form>
  </section>
</template>

<script>
/**
 * ログイン画面
 */
export default {
  /**
   * データ
   */
  data() {
    return {
      /**
       * メールアドレス
       */
      email: "",
      /**
       * パスワード
       */
      password: ""
    };
  },
  /**
   * 算出プロパティ
   */
  computed: {
    /**
     * ログイン済み判定
     */
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  /**
   * ページ遷移前フック
   */
  beforeRouteLeave(to, from, next) {
    // 未ログイン時は他のページに遷移しない
    next(this.isLoggedIn);
  },
  /**
   * イベント
   */
  methods: {
    /**
     * ログインボタン押下
     */
    async doLogin() {
      // ログイントークンを作成する
      const token = {
        email: this.email,
        password: this.password
      };
      // ログイン要求
      const identify = await this.$store.dispatch("login", token);
      if (identify) {
        // ログイン成功を親コンポーネントに通知 ($routeを変更する)
        this.$emit("onIdentifyUpdated");
      }
    }
  }
};
</script>

<style scoped>
section {
  max-width: 400px;
  margin: 0 auto;
}
</style>