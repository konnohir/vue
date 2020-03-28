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
      <my-button
        type="submit"
        variant="success"
        block
        @click.prevent="doLogin"
      >Login</my-button>
    </form>
  </section>
</template>

<script>
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
    },
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
    doLogin() {
      this.$emit("login", { email: this.email, password: this.password });
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