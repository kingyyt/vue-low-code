<script lang="ts">
export default {
  name: '按钮',
  // IF EDITOR
  id: 'button',
  dataComponents: dataComponents,
  // END EDITOR
  props: {
    props: {
      type: Object
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
    <van-button
      :custom-style="`background-color: ${props?.color}; color: ${props?.textColor};`"
      :color="props?.color"
      :style="{ color: props?.textColor }"
      >{{ props?.btnText }}</van-button
    >
  </div>
</template>
