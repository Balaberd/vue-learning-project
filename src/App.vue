<template>
  <navbar-block></navbar-block>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarBlock from "@/components/UI/NavbarBlock.vue";
export default {
  components: { NavbarBlock },
};
</script>

<style>
* {
  margin: 0;
  border: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
</style>
