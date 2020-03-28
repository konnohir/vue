<template>
  <form class="card mb-2">
    <div class="card-body p-2">
      <!-- 検索条件入力欄 -->
      <slot />
      <!-- 検索・条件クリアボタン -->
      <slot name="footer">
        <my-button-wrap>
          <my-button variant="outline-secondary" @click="doClear">条件クリア</my-button>
          <my-button variant="outline-info" type="submit" @click.prevent="doSearch">検索</my-button>
        </my-button-wrap>
      </slot>
    </div>
  </form>
</template>
<script>
export default {
  /**
   * 引数
   */
  props: {
    /**
     * 検索条件
     */
    filter: Object
  },
  /**
   * データ
   */
  data() {
    return {};
  },
  /**
   * 算出プロパティ
   */
  computed: {
    /**
     * $routeから取得した検索条件のオブジェクト
     * @TODO 配列マージ
     */
    currentFilter() {
      return this.$route.query;
    },
    /**
     * 値が空の要素をのぞいた検索条件のオブジェクト
     */
    normalizedFilter() {
      const result = {};
      Object.keys(this.filter).forEach(key => {
        const value = this.filter[key];
        if (
          value === "" ||
          value === false ||
          value === null ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return;
        }
        result[key] = this.filter[key];
      });
      return result;
    },
    /**
     * 値をクリアした検索条件のオブジェクト
     * @TODO 配列マージ
     */
    clearFilter() {
      this.filter; // bugfix
      return {};
    }
  },
  /**
   * 初期化フック
   */
  created() {
    this.$emit("change", this.currentFilter);
  },
  /**
   * イベント
   */
  methods: {
    /**
     * 検索ボタン押下
     */
    doSearch() {
      if (this.$listeners.doSearch) {
        this.$emit("doSearch");
        return;
      }

      this.$router.push({ query: this.normalizedFilter }).catch(() => {});
      this.$emit("change", this.normalizedFilter);
    },
    /**
     * 条件クリアボタン押下
     */
    doClear() {
      if (this.$listeners.doSearch) {
        this.$emit("doClear");
        return;
      }

      this.$router.push({ query: this.clearFilter }).catch(() => {});
      this.$emit("change", this.clearFilter);
    }
  }
};
</script>