<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style lang="less">
::-webkit-scrollbar {
  /*滚动条整体样式*/
  @apply w-2 h-1 /*高宽分别对应横竖滚动条的尺寸*/;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  @apply rounded-xl bg-gray-300;
}
.dark ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  @apply rounded-xl bg-gray-500;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  @apply rounded-xl bg-gray-100;
}
.dark ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  @apply rounded-xl bg-gray-400;
}
.app-container {
  /* 启用滚动条，当内容超出容器宽度时，用户可以滚动查看 */
  // width: 100%;
  // overflow-x: auto;
}
</style>
