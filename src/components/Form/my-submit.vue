<template>
  <b-button v-bind="$attrs" type="submit" :disabled="isDisabled" @click.prevent="onClick">
    <slot></slot>
  </b-button>
</template>
<script>
export default {
  inheritAttrs: false,
  /**
   * 引数
   */
  props: {
    disabled: Boolean
  },
  /**
   * 算出プロパティ
   */
  computed: {
    /**
     * イベント実行中判定
     */
    isExcute() {
      return this.$store.getters.isExcute;
    },
    /**
     * ボタン無効化判定
     */
    isDisabled() {
      return this.disabled || this.isExcute;
    }
  },
  /**
   * イベント
   */
  methods: {
    /**
     * ボタン押下
     */
    onClick(value) {
      this.$emit("click", value);
    }
  }
};
</script>