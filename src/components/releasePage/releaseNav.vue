<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { GetJsonList } from '@/api/microMain/microMain'
import { DownOutlined } from '@ant-design/icons-vue'

const proType = ref<string>('WX') // 发布类型
const plainOptions = [
  { label: '小程序', value: 'WX' },
  { label: 'h5', value: 'h5' }
]

const changeProType = () => {
  sendParent()
}

let list: any = ref()

const getJsonList = async () => {
  const res = await GetJsonList()
  if (res && res.data) {
    list.value = res.data.map((item: any) => {
      try {
        const parseData = JSON.parse(item.json)
        return {
          ...item,
          json: parseData
        }
      } catch (error) {
        return {
          ...item,
          json: []
        }
      }
    })
  }
}
interface JsonListData {
  id: number
  json: any
  name: string
  user_id: number
}
const currentPage: Ref<JsonListData | null> = ref(null)

const openChange = (item: any) => {
  currentPage.value = item
  sendParent()
}

// 初始化
const init = () => {
  sendParent()
  getJsonList()
}
onMounted(async () => {
  init()
})

const sendParent = () => {
  emit('send-data', {
    proType: proType.value,
    currentPage: currentPage.value
  })
}

const emit = defineEmits(['send-data'])
</script>

<template>
  <div
    class="dark:text-gray-400 w-80 dark:bg-gray-700 border-r-2 border-gray-100 dark:border-gray-800 shadow-lg p-4"
    style="height: calc(100vh - 3rem)"
  >
    <div class="ant-radio-group-dark mb-4">
      <span>发布类型：</span
      ><a-radio-group
        @change="changeProType"
        v-model:value="proType"
        option-type="button"
        :options="plainOptions"
      />
    </div>
    <div>
      <span>页面选择：</span>
      <a-dropdown>
        <a class="ant-dropdown-link mb-4" @click.prevent>
          {{ currentPage ? currentPage.name : '选择页面' }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="(item, index) in list" :key="index">
              <div @click="openChange(item)">{{ item.name }}</div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
