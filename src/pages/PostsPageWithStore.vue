<template>
  <div>12</div>
  <my-input v-focus v-model="$state.searchQuery" />
  <div class="app__buttons">
    <my-button @click="dialogVisible = true">new post</my-button>
    <my-select v-model="selectedSort" :options="sortOptions" />
  </div>
  <my-dialog v-model:show="dialogVisible">
    <post-form @create="addPost" />
  </my-dialog>
  <h2 v-if="isPostLoading">Loading...</h2>
  <post-list v-else :posts="$state" @remove="removePost" />
  <div v-intersection="loadMorePosts" class="observer"></div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
    MyButton,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
    addPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style>
.app__buttons {
  display: flex;
  justify-content: space-between;
}
.observer {
  margin-top: 16px;
  height: 30px;
  background-color: lightgray;
  opacity: 0.5;
}
</style>
