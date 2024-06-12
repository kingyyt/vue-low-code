<script setup lang="ts">
import { onMounted } from 'vue'
import WXheader from './preview/WXheader.vue'

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})
</script>

<template>
  <div>
    <div class="container rounded-lg overflow-hidden w-80 bg-white" style="height: 700px">
      <div class="header"><WXheader /></div>
      <div class="content">内容区域</div>
      <div class="footer">底部导航栏</div>
    </div>
  </div>
</template>
<style lang="less"></style>
