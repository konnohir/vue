<template>
  <b-checkbox :value="value" :checked="checked" @input="input" />
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
    checked: { type: Array },
    value: { type: Object },
  },
  /**
   * イベント
   */
  methods: {
    /**
     * ソートリンク押下
     */
    input(event) {
      this.$emit('input', event);
    }
  }
};
</script>