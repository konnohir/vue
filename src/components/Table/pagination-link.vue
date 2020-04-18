<template>
  <li class="page-item">
    <a class="page-link" :href="href" @click.prevent="click"><slot>{{page}}</slot></a>
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
    page: Number
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
    href() {
      return this.$router.resolve({ query: {...this.query, page: this.page} }).route.fullPath;
    }
  },
  /**
   * イベント
   */
  methods: {
    /**
     * ページネーションリンク押下
     */
    click() {
      this.$router.push({query: {...this.query, page: this.page}}).catch(()=>{});
    }
  }
};
</script>