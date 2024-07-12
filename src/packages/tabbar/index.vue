<script lang="ts">
export default {
  name: 'tabbar',
  // IF EDITOR
  id: 'tabbar',
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
  watch: {
    props: {
      handler(newVal: any) {
        this.active = this.props.active
      },
      deep: true
    }
  },
  methods: {
    clickItem(e: number) {
      this.active = this.props.active
      this.$emit('clickItem', e)
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
    <van-tabbar v-model="active">
      <van-tabbar-item
        @click="clickItem(index)"
        v-for="(item, index) in props?.tabbars"
        :key="index"
        :icon="item.icon"
      >
        {{ item.name }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
