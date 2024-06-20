<script lang="ts">
export default {
  name: '单元格',
  id: 'cell'
}
</script>
<script setup lang="ts">
// IF EDITOR
import { editorPropsData } from './data'

defineExpose({
  editorPropsData: editorPropsData().value
})
// END EDITOR
</script>

<template>
  <div><van-button type="success">单元格</van-button></div>
</template>
