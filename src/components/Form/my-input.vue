<template>
  <div class="form-group">
    <label :for="uniqueKey" v-if="label">{{label}}</label>
    <b-input :id="uniqueKey" v-bind="$attrs" @input="input" />
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  /**
   * 引数
   */
  props: {
    label: String,
  },
  computed: {
    uniqueKey() {
      return 'z' + this._uid
    }
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