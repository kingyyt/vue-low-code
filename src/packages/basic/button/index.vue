<script lang="ts">
export default {
  name: '按钮',
  id: 'button'
}
</script>
<script setup lang="ts">
const props = defineProps<{
  propsList: Number
}>()
console.log(props.propsList)
console.log(props.propsList)
</script>

<template>
  <div>
    <van-button type="danger">按钮</van-button>
  </div>
</template>
