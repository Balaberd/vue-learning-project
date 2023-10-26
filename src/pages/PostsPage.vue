<template>
  <my-input v-focus v-model="searchQuery" />
  <!-- <post-pagination
    @changePage="changePage"
    :currentPage="page"
    :pagesLimit="lastPage"
  >
  </post-pagination> -->
  <div class="app__buttons">
    <my-button @click="dialogVisible = true">new post</my-button>
    <my-select v-model="selectedSort" :options="sortOptions" />
  </div>
  <my-dialog v-model:show="dialogVisible">
    <post-form @create="addPost" />
  </my-dialog>
  <h2 v-if="isPostLoading">Loading...</h2>
  <post-list v-else :posts="sortedAndSearchedPosts" @remove="removePost" />
  <div v-intersection="loadMorePosts" class="observer"></div>
</template>

<script>
import axios from "axios";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
// import PostPagination from "@/components/Pagination/PostPagination.vue";

export default {
  components: {
    PostForm,
    PostList,
    // PostPagination,
  },
  data() {
    return {
      searchQuery: "",
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      page: 1,
      pageLimit: 10,
      lastPage: null,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
    };
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(
        (post) =>
          post.title.includes(this.searchQuery) ||
          post.body.includes(this.searchQuery)
      );
    },
    // sortedAndSearchedAndPaginatedPosts() {
    //   const startIndex = (this.page - 1) * this.pageLimit;
    //   return this.sortedAndSearchedPosts.slice(
    //     startIndex,
    //     startIndex + this.pageLimit
    //   );
    // },
  },
  methods: {
    addPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    // changePage(newPage) {
    //   this.page = +newPage;
    //   this.fetchPosts();
    // },
    async fetchPosts() {
      this.isPostLoading = true;
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.pageLimit,
            },
          }
        );
        this.lastPage = Math.ceil(
          response.headers["x-total-count"] / this.pageLimit
        );
        this.posts = response.data;
      } catch (e) {
        alert(e);
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      this.page += 1;
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.pageLimit,
            },
          }
        );
        this.lastPage = Math.ceil(
          response.headers["x-total-count"] / this.pageLimit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert(e);
      }
    },
  },
  mounted() {
    this.fetchPosts();

    // Вынесено в миксин
    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    // const callback = (entries, observer) => {
    //   console.log(observer);
    //   if (entries[0].isIntersecting && this.page < this.lastPage) {
    //     this.loadMorePosts();
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
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
