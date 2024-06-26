<script lang="ts">
export default {
  name: '按钮',
  id: 'button',
  // IF EDITOR
  dataComponents: dataComponents,
  // END EDITOR
  props: {
    propsData: {
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
    {{ propsData }}
    <van-button :color="propsData.color">{{ propsData.btnText }}</van-button>
  </div>
</template>
