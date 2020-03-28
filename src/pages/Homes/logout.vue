<template>
  <section></section>
</template>

<script>
export default {
  /**
   * 初期化フック
   */
  async created() {
    this.$emit("logout");
  }
};
</script>