<template>
  <app-page @onUpdate="onUpdate" :key="id">
    <!-- タイトル -->
    <h2 class="mb-2">
      ユーザーマスタ
      <template v-if="id">#{{id}}</template>
    </h2>
    <router-link to="/users/add">Add</router-link>
    <router-link to="/users/edit/1">Edit 1</router-link>
    <router-link to="/users/edit/2">Edit 2</router-link>
    <input v-model="user.email" />
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