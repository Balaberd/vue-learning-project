<template>
  <div class="pagination" v-if="pagesLimit && pagesLimit !== 1">
    <div
      v-for="page in pagesLimit"
      :key="page"
      class="page"
      :class="{
        page_active: currentPage === page,
      }"
      @click="changePage"
    >
      {{ page }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    pagesLimit: Number,
  },
  methods: {
    changePage(e) {
      this.$emit("changePage", e.target.innerText);
    },
  },
};
</script>

<style scoped>
.pagination {
  padding: 20px 0;
  display: flex;
  gap: 12px;
}
.page {
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid teal;
  border-radius: 8px;
  cursor: pointer;
}
.page_active {
  background-color: teal;
  color: white;
}
</style>
