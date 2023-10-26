<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped>
.button {
  padding: 10px 15px;
  border: 1px solid teal;

  color: teal;
  background: none;
  border-radius: 10px;
}
</style>
