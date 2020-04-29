<template>
  <app-page @onUpdate="onUpdate" class="md">
    <!-- ------------------------------------- -->
    <!-- タイトル -->
    <!-- ------------------------------------- -->
    <h2 class="mb-2">
      ユーザーマスタ
      <template v-if="id">#{{id}}</template>
    </h2>

    <!-- ------------------------------------- -->
    <!-- 編集フォーム領域 -->
    <!-- ------------------------------------- -->
    <form-section>
      <my-input v-model="user.email" label="メールアドレス" />
      <my-input v-model="user.role_id" label="権限" />
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
      user: {
        /**
         * メールアドレス
         */
        email: "",
        /**
         * 権限ID
         */
        role_id: null
      }
    };
  },
  /**
   * 算出プロパティ
   */
  computed: {
    id() {
      return this.$route.params.id || null;
    }
  },
  /**
   * イベント
   */
  methods: {
    /**
     * 一覧更新
     */
    async onUpdate() {
      if (this.id === null) {
        return;
      }
      const response = await this.$store.dispatch("get", {
        url: "/users/edit/" + this.id,
        query: this.$route.query
      });
      if (response === null) {
        return;
      }
      this.user.email = response.user?.email;
      this.user.role_id = response.user?.role_id;
    }
  }
};
</script>
