<template>
  <app-page class="sm">
    <form-section>
      <!-- メールアドレス -->
      <my-input
        type="text"
        autocomplete="username"
        placeholder="メールアドレス"
        v-model="email"
      />
      <!-- パスワード -->
      <my-input
        type="password"
        autocomplete="current-password"
        placeholder="パスワード"
        v-model="password"
      />
      <!-- ログイン -->
      <my-submit variant="success" block @click="doLogin">ログイン</my-submit>
    </form-section>
  </app-page>
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
   * @refs https://router.vuejs.org/ja/guide/advanced/navigation-guards.html
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
      const identity = await this.$store.dispatch("login", token);
      if (identity) {
        // ログイン成功を親コンポーネントに通知 (画面遷移する)
        this.$emit("onIdentityUpdated");
      }else {
        this.$store.commit('error', 'ログインに失敗しました。')
      }
    }
  }
};
</script>
