<template>
  <app-page @onUpdate="onUpdate" class="md">
    <!-- ==================================== -->
    <!-- 画面タイトル -->
    <!-- ==================================== -->
    <h2 class="mb-2">
      ユーザーマスタ
      <template v-if="id">#{{id}}</template>
    </h2>

    <!-- ==================================== -->
    <!-- 編集フォーム領域 -->
    <!-- ==================================== -->
    <form-section>
      <!-- メールアドレス -->
      <my-input v-model="user.email" label="メールアドレス" />
      <!-- 権限 -->
      <my-input v-model="user.role_id" label="権限" />
      <!-- アクションボタン -->
      <my-button-wrap class="justify-content-center mb-2">
        <!-- キャンセルボタン -->
        <my-button variant="outline-secondary" @click="doCancel">キャンセル</my-button>
        <!-- 保存ボタン -->
        <my-button variant="outline-success" @click="doSave">保存</my-button>
      </my-button-wrap>
    </form-section>
  </app-page>
</template>

<script>
/**
 * ユーザーマスタ編集画面
 */
export default {
  async created() {
    console.log("user edit");
  },
  /**
   * この画面で使用するデータ
   */
  data() {
    return {
      /**
       * ユーザー
       */
      user: {
        // メールアドレス
        email: "",
        // 権限ID
        role_id: null,
      }
    };
  },
  /**
   * 算出プロパティ
   */
  computed: {
    id() {
      return this.$route.params.id || null;
    },
    apiEndpoint() {
      if (this.id === null) {
        return "/users/add";
      }else {
        return "/users/edit/" + this.id;
      }
    }
  },
  /**
   * イベント
   */
  methods: {
    /**
     * 画面初期表示・URLパラメータ変更
     */
    async onUpdate() {
      const response = await this.$store.dispatch("get", {
        url: this.apiEndpoint,
        query: this.$route.query
      });
      if (response === null) {
        return;
      }
      this.user.email = response.user.email;
      this.user.role_id = response.user.role_id;
    },
    /**
     * キャンセルボタン押下
     */
    doCancel() {
      this.$router.push("/users");
    },
    /**
     * 保存ボタン押下
     */
    doSave() {

    }
  }
};
</script>
