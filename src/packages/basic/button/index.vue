<script lang="ts">
export default {
  name: '按钮',
  id: 'button',
  // IF EDITOR
  dataComponents: dataComponents,
  // END EDITOR
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<script setup lang="ts">
// IF EDITOR
import dataComponents, { editorPropsData } from './data'
defineExpose({
  editorPropsData: editorPropsData()
})
// END EDITOR
</script>

<template>
  <div>
    <van-button type="danger">{{ props.defaultValue }}</van-button>
  </div>
</template>
