<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue3</div>
    <div class="navbar__buttons">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/posts-with-store')"
        >Posts with store</my-button
      >
      <my-button @click="$router.push('/about')">About</my-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar-block",
};
</script>

<style scoped>
.navbar {
  height: 58px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__buttons {
  margin-left: auto;
  display: flex;
  gap: 20px;
}
</style>
