<template>
  <section>
    <!-- タイトル -->
    <h2 class="mb-2">ユーザーマスタ #{{$route.params.id}}</h2>
  </section>
</template>

<script>
/**
 * ユーザーマスタ編集画面
 */
export default {
  async created() {
    console.log("user edit")
  }
}
</script>