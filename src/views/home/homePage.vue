<script setup lang="ts">
import { onMounted, ref } from 'vue'
import homeNav from '@/components/home/homeNav.vue'
import homeBar from '@/components/home/homeBar.vue'

const homeNavRef = ref<any>()
const toggleCollapsed = () => {
  if (homeNavRef.value) {
    homeNavRef.value.toggleCollapsed()
  }
}

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})
</script>

<template>
  <div class="flex dark:bg-gray-700">
    <homeNav ref="homeNavRef" />
    <div class="flex flex-col flex-grow">
      <homeBar @toggle-collapsed="toggleCollapsed" />
      <div class="flex-grow overflow-y-auto" style="height: calc(100vh - 3rem)">
        <router-view />
      </div>
    </div>
  </div>
</template>
