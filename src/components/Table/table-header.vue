<template>
  <th>
    <a :href="href" :class="linkClass" v-if="sort" @click.prevent="click">
      <slot></slot>
    </a>
    <template v-else>
      <slot></slot>
    </template>
  </th>
</template>
<script>
export default {
  /**
   * 引数
   */
  props: {
    sort: { type: String }
  },
  /**
   * 算出プロパティ
   */
  computed: {
    /**
     * 現在のソートフィールド
     */
    currentSort() {
      return this.$route.query.sort;
    },
    /**
     * 現在のソート順
     */
    currentDirection() {
      return this.$route.query.direction;
    },
    /**
     * ソート順
     */
    direction() {
      if (this.sort === this.currentSort && this.currentDirection === "asc") {
        return "desc";
      }
      return "asc";
    },
    /**
     * リンク押下時の遷移先ルート
     */
    route() {
      return {
        query: {
          page: this.$route.query.page,
          ...this.$route.query,
          sort: this.sort,
          direction: this.direction
        }
      };
    },
    /**
     * aタグに設定するhref
     */
    href() {
      return this.$router.resolve(this.route).route.fullPath;
    },
    /**
     * aタグに設定するclass
     */
    linkClass() {
      return this.sort === this.currentSort ? this.direction : "";
    }
  },
  /**
   * イベント
   */
  methods: {
    /**
     * ソートリンク押下
     */
    click() {
      this.$router.push(this.route);
    }
  }
};
</script>
