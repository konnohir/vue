<template>
  <div class="form-group">
    <label :for="id" v-if="label">{{label}}</label>
    <b-input :id="id" v-bind="$attrs" @input="input" />
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  /**
   * 引数
   */
  props: {
    id: String,
    label: String,
  },
  /**
   * イベント
   */
  methods: {
    /**
     * 文字入力
     */
    input(value) {
      this.$emit("input", value);
    }
  }
};
</script>