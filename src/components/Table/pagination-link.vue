<template>
  <li class="page-item" :class="{'active': currentPage === page}">
    <router-link class="page-link" :to="to"><slot>{{page}}</slot></router-link>
  </li>
</template>
<script>
/**
 * 行選択チェックボックス
 */
export default {
  /**
   * 引数
   */
  props: {
    page: Number,
    currentPage: Number,
  },
  computed: {
    /**
     * 現在の検索条件
     */
    query() {
      return this.$route.query;
    },
    /**
     * aタグのhref
     */
    to() {
      return this.$router.resolve({ query: {...this.query, page: this.page} }).route.fullPath;
    }
  },
};
</script>