<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import previewPage from '@/components/releasePage/previewPage.vue'
import releaseNav from '@/components/releasePage/releaseNav.vue'
import releaseFunction from '@/components/releasePage/releaseFunction.vue'

const releaseNavData = ref(null)
const previewPageRef = ref<InstanceType<typeof previewPage> | null>(null)
const receivedData = async (data: any) => {
  releaseNavData.value = data
  await nextTick()
  if (data.currentPage && previewPageRef.value) {
    previewPageRef.value.jsonComponents()
  }
}

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})
</script>

<template>
  <div class="flex justify-between">
    <releaseNav @send-data="receivedData" />
    <previewPage ref="previewPageRef" :releaseNavData="releaseNavData" />
    <releaseFunction />
  </div>
</template>
