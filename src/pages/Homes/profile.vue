<template>
  <app-page>
    <!-- ==================================== -->
    <!-- 画面タイトル -->
    <!-- ==================================== -->
    <h2 class="mb-2">プロファイル</h2>
    {{identity.email}}
  </app-page>
</template>

<script>
/**
 * プロファイル画面
 */
export default {
  /**
   * 算出プロパティ
   */
  computed: {
    /**
     * ログインユーザー情報
     */
    identity() {
      return this.$store.getters.identity;
    },
  }
}
</script>