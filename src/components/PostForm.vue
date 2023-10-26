<template>
  <form class="form" @submit.prevent>
    <h4>Создание поста</h4>
    <my-input v-focus v-model="post.title" placeholder="title" />
    <my-input v-model="post.body" placeholder="post content" />
    <my-button @click="createPost" :class="btn" style="align-self: flex-end"
      >add</my-button
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.$emit("create", { ...this.post, id: Date.now() }, "ARG-2", "ARG-3");
      this.post = { title: "", body: "" };
    },
  },
  watch: {
    post: {
      handler(newValue) {
        console.log(newValue);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.btn {
  align-self: flex-end;
}
</style>
