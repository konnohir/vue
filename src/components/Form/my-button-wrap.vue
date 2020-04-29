<template>
  <div class="form-inline wrap">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.wrap {
  letter-spacing:-1em;
}
.wrap > * {
  letter-spacing:normal;
  margin-left: 2px;
  margin-right: 2px;
}
</style>
