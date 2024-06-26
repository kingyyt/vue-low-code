<script setup lang="ts">
import { nextTick, onMounted, ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import {
  PlayCircleOutlined,
  ReloadOutlined,
  SaveOutlined,
  CloudDownloadOutlined,
  DownOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined
} from '@ant-design/icons-vue'
import {
  GetJsonList,
  PostJsonList,
  // GetJsonListDetail,
  PatchJsonListDetail
  // DeleteJsonListDetail
} from '@/api/microMain/microMain'
import { message } from 'ant-design-vue'
import { useMainListStore } from '@/stores/modules/microPage'
import downCodeBtn from './components/downCodeBtn.vue'
import type { JsonListData } from '@/api/microMain/model/microModel'

// 初始化
const init = () => {
  getJsonList()
}
onMounted(async () => {
  init()
})
// 获取mainListStore
const store = useMainListStore()
// 获取json列表
let list: Ref<JsonListData[]> = ref([])
const getJsonList = async () => {
  const res = await GetJsonList()
  if (res && res.data) {
    list.value = res.data.map((item: JsonListData) => {
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
// 列表点击
const currentPageList: Ref<JsonListData | null> = ref(null)
const openChange = (item: any) => {
  currentPageList.value = item
  store.setMainList(item.json)
  store.setPageName(item.name)
  store.setUpdate(1)
}
// 保存页面之前 进行form校验
const isValiDate = ref(false)
const mainStatus = computed(() => store.update)
watch(
  mainStatus,
  async (newVal, oldVal) => {
    // console.log(newVal, oldVal)
    if (store.update == 0) {
      return
    } else if (newVal == 5 && oldVal == 4) {
      // 页面设置校验通过
      store.setUpdate(7)
    } else if (newVal == 8) {
      // 编辑组件校验通过
      savePage()
      isValiDate.value = true
    } else if (newVal == 7 && oldVal == 5) {
      // 编辑组件校验
      isValiDate.value = false
    } else if (newVal == 4 && oldVal == 0) {
      // 页面设置校验不通过
      isValiDate.value = false
    } else if (newVal == 6 && oldVal == 0) {
      setTimeout(() => {
        store.setUpdate(2)
      }, 0)
      downCodeBtnRef.value?.showModal(currentPageList.value)
    }
  },
  {
    deep: true
  }
)
// 保存页面校验
const savePageVaidate = async () => {
  store.setUpdate(4)
}
// 保存页面
const savePage = async () => {
  store.setUpdate(2)
  await nextTick
  if (currentPageList.value && currentPageList.value.id) {
    const res: any = await PatchJsonListDetail(
      { json: listToJson(), name: store.name },
      currentPageList.value.id
    )
    if (!res) return
    message.success('编辑成功')
    currentPageList.value = res
    if (currentPageList.value && currentPageList.value.json) {
      currentPageList.value.json = JSON.parse(currentPageList.value?.json)
    }
  } else {
    store.setUpdate(2)
    await nextTick
    const res: any = await PostJsonList({
      json: listToJson(),
      name: store.name
    })
    if (!res.data) return
    message.success('保存成功')
    currentPageList.value = res.data
    if (currentPageList.value && currentPageList.value.json) {
      currentPageList.value.json = JSON.parse(currentPageList.value?.json)
    }
  }
  openChange(currentPageList.value)
  init()
}

// 新建页面
const newPage = async () => {
  currentPageList.value = null
  resetPage()
}

// 转化json数据
const listToJson = () => {
  // 使用JSON.parse()和JSON.stringify()进行深拷贝
  const jsonData: any[] = []
  store.mainList.forEach((item: any) => {
    jsonData.push({
      id: item.id,
      name: item.name,
      model: item.props.formData.model
    })
  })
  return JSON.stringify(jsonData)
}

// 重置页面

const resetPage = () => {
  store.removeMainList()
  store.removeName()
  store.setUpdate(3)
}

const downCodeBtnRef = ref<InstanceType<typeof downCodeBtn> | null>(null)
// 下载源码校验
const downCodeVaidate = async () => {
  savePageVaidate()
  setTimeout(async () => {
    console.log(isValiDate.value)
    console.log(isValiDate.value)
    if (isValiDate.value) {
      await downCode()
    }
  }, 100)
}
// 下载源码
const downCode = async () => {
  store.setUpdate(6)
}
</script>

<template>
  <div class="dark:text-white">
    <downCodeBtn ref="downCodeBtnRef" />
    <a-popover>
      <template #content>
        <p>预览</p>
      </template>
      <PlayCircleOutlined class="mr-4" />
    </a-popover>
    <a-popover>
      <template #content>
        <p>下载源码</p>
      </template>
      <CloudDownloadOutlined @click="downCodeVaidate" class="mr-4" />
    </a-popover>
    <a-popover>
      <template #content>
        <p>重置</p>
      </template>
      <ReloadOutlined @click="resetPage" class="mr-4" />
    </a-popover>
    <a-popover>
      <template #content>
        <p>保存</p>
      </template>
      <SaveOutlined @click="savePageVaidate" class="mr-4" />
    </a-popover>
    <a-popover>
      <template #content>
        <p>新增页面</p>
      </template>
      <PlusCircleOutlined @click="newPage" class="mr-4" />
    </a-popover>

    <a-dropdown>
      <a class="ant-dropdown-link text-sm" @click.prevent>
        选择页面
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
    <span class="ml-4 text-sm"
      ><span class="text-yellow-400"><InfoCircleOutlined /></span>
      {{
        currentPageList && currentPageList.id
          ? `当前编辑页面：${currentPageList.name}`
          : '正在编辑新页面'
      }}</span
    >
  </div>
</template>
