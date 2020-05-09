<template>
  <div class="d-flex button-wrap">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.button-wrap {
  letter-spacing:-1em;
}
.button-wrap > * {
  letter-spacing:normal;
  margin-left: 2px;
  margin-right: 2px;
}
</style>
