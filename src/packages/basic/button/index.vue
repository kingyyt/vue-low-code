<script lang="ts">
export default {
  name: '按钮',
  id: 'button',
  type: 'success'
}
</script>
<script setup lang="ts">
// import { onMounted } from 'vue'

// 初始化
// const init = () => {}
// onMounted(async () => {
//   init()
// })
const type = 'success'
// defineExpose({
//   name: '按钮',
//   id: 'button',
//   type: 'success'
// });
</script>

<template>
  <a-button :type="type">按钮</a-button>
</template>
