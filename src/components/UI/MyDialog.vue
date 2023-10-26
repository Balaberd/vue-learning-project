<template>
  <div class="dialog" @click="hideDialog" v-if="show">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";
export default {
  name: "my-dialog",
  mixins: [toggleMixin],

  // реализовано в миксине
  // props: {
  //   show: Boolean,
  // },
  // methods: {
  //   hideDialog() {
  //     this.$emit("update:show", false);
  //   },
  // },
};
</script>

<style>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;

  display: flex;
}

.dialog__content {
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  min-width: 50px;
  min-height: 50px;
}
</style>
