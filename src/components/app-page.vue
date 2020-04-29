<template>
  <section>
    <slot />
  </section>
</template>
<script>
/**
 * 一覧画面レイアウト
 */
export default {
  /**
   * v-model 割当先
   */
  model: {
    prop: "filter"
  },
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
   * 算出プロパティ
   */
  computed: {
    /**
     * すべての要素の値を空にした検索条件(filter)のオブジェクト
     */
    clearFilter() {
      const result = {};
      Object.keys(this.filter || {}).forEach(key => {
        const value = this.filter[key];
        switch (typeof value) {
          case "string":
            result[key] = "";
            break;
          case "number":
            result[key] = null;
            break;
          case "boolean":
            result[key] = false;
            break;
          default:
            if (value) {
              result[key] = [];
            } else {
              result[key] = null;
            }
            break;
        }
      });
      return result;
    },
    /**
     * $routeから取得した検索条件(filter)のオブジェクト
     */
    filterFromRoute() {
      const result = {};
      Object.keys(this.$route.query).forEach(key => {
        const value = this.$route.query[key];
        switch (typeof this.filter[key]) {
          case "string":
            result[key] = String(value);
            break;
          case "number":
            result[key] = Number(value);
            break;
          case "boolean":
            result[key] = Boolean(value);
            break;
          case "undefined":
            // pass
            break;
          default:
            result[key] = value;
            break;
        }
      });
      return result;
    }
  },
  /**
   * 監視プロパティ
   */
  watch: {
    $route() {
      // URLのクエリパラメータが変化したらfilterにマージする
      this.acceptQuery();
    }
  },
  /**
   * 初期化フック
   */
  created() {
    // URLのクエリパラメータをfilterにマージする
    this.acceptQuery();
  },
  /**
   * イベント
   */
  methods: {
    /**
     * URLのクエリパラメータをfilterにマージする
     */
    acceptQuery() {
      // 検索ボタンが押下された(クエリパラメータにpageがある)場合
      // if (this.$route.query.page) {
      //   // 検索欄のデフォルト値を破棄してクエリパラメータをセットする
      //   this.$emit("input", { ...this.clearFilter, ...this.filterFromRoute });
      // } else {
      //   // 検索欄のデフォルト値にクエリパラメータをマージする
      //   this.$emit("input", { ...this.filter, ...this.filterFromRoute });
      // }
      this.$emit("input", { ...this.clearFilter, ...this.filterFromRoute });
      this.$emit("onUpdate");
    },
  }
};
</script>

<style scoped>
.md {
  margin: 0 auto;
  max-width: 600px;
}
</style>