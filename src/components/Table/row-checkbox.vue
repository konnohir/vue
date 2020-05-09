<template>
  <b-checkbox :value="value" :checked="checked" @input="onInput" />
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
    checked: Array,
    value: Object,
  },
  /**
   * イベント
   */
  methods: {
    /**
     * チェックボックス選択
     */
    onInput(event) {
      this.$emit('input', event);
    }
  }
};
</script>