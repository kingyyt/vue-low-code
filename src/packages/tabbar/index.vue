<script lang="ts">
export default {
  name: 'tabbar',
  id: 'tabbar',
  // IF EDITOR
  dataComponents: dataComponents,
  // END EDITOR
  props: {
    props: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      active: 0
    }
  },
  created() {}
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
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="(item, index) in props?.tabbars" :key="index" :icon="item.icon">
        {{ item.name }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
