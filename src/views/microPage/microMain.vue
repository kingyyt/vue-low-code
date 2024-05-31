<template>
  <div class="flex dark:text-gray-100" style="height: calc(100vh - 3rem)">
    <microAside />
    <microContainer />
    <microEditor />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import microAside from '@/components/microMain/microAside.vue'
import microContainer from '@/components/microMain/microContainer.vue'
import microEditor from '@/components/microMain/microEditor.vue'

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})
</script>
