<script lang="ts">
export default {
  name: '按钮',
  id: 'button',
  // IF EDITOR
  dataComponents: dataComponents
  // END EDITOR
}
</script>
<script setup lang="ts">
// IF EDITOR
import dataComponents, { editorPropsData } from './data'
defineExpose({
  editorPropsData: editorPropsData()
})
// END EDITOR
const props = defineProps<{
  props: any
}>()
</script>

<template>
  <div>
    <van-button type="danger">{{ props.props?.defaultValue }}</van-button>
  </div>
</template>
