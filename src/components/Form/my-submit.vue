<template>
  <div class="form-group">
    <b-button v-bind="$attrs" type="submit" :disabled="isDisabled" @click.prevent="click">
      <slot></slot>
    </b-button>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  /**
   * 引数
   */
  props: {
    disabled: Boolean,
  },
  /**
   * 算出プロパティ
   */
  computed: {
    /**
     * ボタン無効化判定
     */
    isDisabled() {
      return this.disabled || this.isExcute
    },
    /**
     * イベント実行中判定
     */
    isExcute() {
      return this.$store.getters.isExcute;
    }
  },
  /**
   * イベント
   */
  methods: {
    /**
     * ボタン押下
     */
    click(value) {
      this.$emit("click", value);
    }
  }
};
</script>