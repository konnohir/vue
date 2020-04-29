<template>
  <!-- 検索条件エリア -->
  <filter-section>
    <!-- メールアドレス -->
    <my-input
      :value="email"
      @input="$emit('update:email', $event)"
      label="メールアドレス"
      id="filter-email"
    />
    <!-- 権限 -->
    <my-input
      :value="role_name"
      @input="$emit('update:role_name', $event)"
      label="権限"
      id="filter-role-name"
    />
    <!-- 検索・条件クリアボタン -->
    <my-button-wrap>
      <my-button variant="outline-secondary" @click="doClear">条件クリア</my-button>
      <my-submit variant="outline-info" @click="doSearch">検索</my-submit>
    </my-button-wrap>
  </filter-section>
</template>

<script>
export default {
  /**
   * 引数
   */
  props: {
    /**
     * メールアドレス
     */
    email: String,
    /**
     * 権限名
     */
    role_name: String
  },
  /**
   * 算出プロパティ
   */
  computed: {
    /**
     * 検索クエリ
     */
    searchQuery() {
      return {
        page: 1,
        email: this.email,
        role_name: this.role_name,
        sort: this.$route.query.sort,
        direction: this.$route.query.direction
      };
    },
    /**
     * 条件クリアクエリ
     */
    resetQuery() {
      return {};
    }
  },
  /**
   * イベント
   */
  methods: {
    /**
     * 検索ボタン押下
     */
    doSearch() {
      this.$router.push({ query: this.searchQuery }).catch(() => {
        // Navigation Duplicated
        this.$emit("onUpdate");
      });
    },
    /**
     * 条件クリアボタン押下
     */
    doClear() {
      this.$router.push({ query: this.resetQuery }).catch(() => {
        // Navigation Duplicated
        this.$emit("onUpdate");
      });
    },
  }
};
</script>