<script setup lang="ts">
import { onMounted, h, ref } from 'vue'
import { editComponents } from '@/packages/basic/button/data'

// const components = h(editComponents, { type: 'primary' }, 'click me')
const editorButton = ref(editComponents())

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})
</script>

<template>
  <div class="w-80 min-w-80 h-full shadow-md p-4">
    <component :is="editorButton" />
  </div>
</template>
