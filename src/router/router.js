import MainPage from "@/pages/MainPage.vue";
import PostsPage from "@/pages/PostsPage.vue";
import PostPage from "@/pages/PostPage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import PostsPageWithStore from "@/pages/PostsPageWithStore";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/posts",
    component: PostsPage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/posts/:id",
    component: PostPage,
  },
  {
    path: "/posts-with-store",
    component: PostsPageWithStore,
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});
