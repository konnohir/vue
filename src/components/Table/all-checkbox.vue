<template>
  <b-checkbox :checked="checked" @change="onChange" />
</template>
<script>
/**
 * 全選択チェックボックス
 */
export default {
  /**
   * 引数
   */
  props: {
    selected: Array,
    all: Array
  },
  /**
   * 算出プロパティ
   */
  computed: {
    checked() {
      return this.all.length !== 0 && this.all.length === this.selected.length;
    }
  },
  /**
   * イベント
   */
  methods: {
    /**
     * チェックボックス選択
     */
    onChange(value) {
      if (value) {
        this.$emit("input", this.all);
      } else {
        this.$emit("input", []);
      }
    }
  }
};
</script>