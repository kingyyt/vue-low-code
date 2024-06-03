<script lang="ts">
export default {
  name: '按钮',
  id: 'button'
}
</script>
<script setup lang="ts">
import { defineExpose } from 'vue'
import { editorPropsData } from './data'

defineExpose({
  editorPropsData: editorPropsData().value
})
</script>

<template>
  <div>
    <van-button type="danger">{{ editorPropsData().value.text }}</van-button>
  </div>
</template>
