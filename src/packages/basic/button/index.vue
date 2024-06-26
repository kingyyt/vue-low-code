<script lang="ts">
export default {
  name: '按钮',
  id: 'button',
  // IF EDITOR
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
    <van-button :color="props?.color">{{ props?.btnText }}</van-button>
  </div>
</template>
