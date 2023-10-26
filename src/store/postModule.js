import axios from "axios";

export const postModule = {
  state: () => ({
    searchQuery: "",
    posts: [],
    isPostLoading: false,
    page: 1,
    pageLimit: 10,
    lastPage: null,
    selectedSort: "",
    sortOptions: [
      { value: "title", name: "По названию" },
      { value: "body", name: "По содержимому" },
    ],
  }),
  getters: {
    sortedPosts(state) {
      return [state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter(
        (post) =>
          post.title.includes(state.searchQuery) ||
          post.body.includes(state.searchQuery)
      );
    },
  },
  muttations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setLastPages(state, lastPage) {
      state.lastPage = lastPage;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      commit("setLoading", true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.pageLimit,
            },
          }
        );
        commit(
          "setLastPage",
          Math.ceil(response.headers["x-total-count"] / state.pageLimit)
        );
        commit("setPosts", response.data);
      } catch (e) {
        alert(e);
      } finally {
        commit("setLoading", false);
      }
    },
  },
  async loadMorePosts({ state, commit }) {
    commit("page", state.page + 1);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: state.page,
            _limit: state.pageLimit,
          },
        }
      );
      commit(
        "setLastPage",
        Math.ceil(response.headers["x-total-count"] / this.pageLimit)
      );
      commit("setPosts", [...state.posts, ...response.data]);
    } catch (e) {
      alert(e);
    }
  },
  namespaced: true,
};
