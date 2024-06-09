<script setup lang="ts">
import { onMounted } from 'vue'
import {
  PlayCircleOutlined,
  ReloadOutlined,
  SaveOutlined,
  CloudDownloadOutlined
} from '@ant-design/icons-vue'

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})
</script>

<template>
  <div class="text-white">
  <a-popover >
    <template #content>
      <p>预览</p>
    </template>
    <PlayCircleOutlined class="mr-4" />
  </a-popover>
  <a-popover >
    <template #content>
      <p>重置</p>
    </template>
    <ReloadOutlined class="mr-4" />
  </a-popover>
  <a-popover >
    <template #content>
      <p>打包</p>
    </template>
    <SaveOutlined class="mr-4" />
  </a-popover>
  <a-popover >
    <template #content>
      <p>下载源码</p>
    </template>
    <CloudDownloadOutlined class="mr-4" />
  </a-popover>
  </div>
</template>
