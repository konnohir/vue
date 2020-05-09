<template>
  <app-page></app-page>
</template>

<script>
/**
 * ログアウト
 */
export default {
  /**
   * 初期化フック
   */
  async created() {
    // ログアウト要求
    await this.$store.dispatch("logout");
    // ログアウトを親コンポーネントに通知 ($routeを変更する)
    this.$emit("onIdentityUpdated");
  }
};
</script>
