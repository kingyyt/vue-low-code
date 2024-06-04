<script lang="ts">
export default {
  name: '按钮',
  id: 'button',
  dataComponents: dataComponents
}
</script>
<script setup lang="ts">
import dataComponents, { editorPropsData } from './data'

defineExpose({
  editorPropsData: editorPropsData().value
})
</script>

<template>
  <div>
    <van-button type="danger">{{ editorPropsData().value.defaultValue }}</van-button>
  </div>
</template>
