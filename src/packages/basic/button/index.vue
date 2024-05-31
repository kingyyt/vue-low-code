<script lang="ts">
export default {
  name: '按钮',
  id: 'button'
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  propsList: Number
}>()
console.log(props.propsList)
console.log(props.propsList)
console.log(props.propsList)
console.log(props.propsList)
console.log(props.propsList)
</script>

<template>
  <van-button type="danger">按钮</van-button>
</template>
