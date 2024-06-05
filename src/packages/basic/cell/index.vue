<script lang="ts">
export default {
  name: '单元格',
  id: 'cell'
}
</script>
<script setup lang="ts">
import { editorPropsData } from './data'

defineExpose({
  editorPropsData: editorPropsData().value
})
</script>

<template>
  <div><van-button type="success">单元格</van-button></div>
</template>
