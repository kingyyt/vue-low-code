<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header> -->
  <RouterView />
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
</style>
