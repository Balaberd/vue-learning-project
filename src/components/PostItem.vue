<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div class="post__buttons">
      <my-button @click="$router.push(`/posts/${post.id}`)">open</my-button>
      <my-button @click="$emit('remove', post)">remove</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {},
  },
};
</script>

<style scoped>
.post {
  margin-top: 15px;
  padding: 15px;
  border: 2px solid teal;
  display: flex;
  justify-content: space-between;
}

.post__buttons {
  display: flex;
  flex-direction: column;
}
</style>
