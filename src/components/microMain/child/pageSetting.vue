<script setup lang="ts">
import { onMounted, watch, computed, reactive, ref } from 'vue'
import { useMainListStore } from '@/stores/modules/microPage'
import { useLoginStore } from '@/stores/modules/user'
import type { FormInstance } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import { GetJsonList } from '@/api/microMain/microMain'
import iconList from './iconList.vue'
import type { tabbarsList, FormState } from '@/api/microMain/model/microModel'
import { message } from 'ant-design-vue'

// 表单
const visible = ref(false)
const modalFormRef = ref<FormInstance>()
const modalFormState = ref<tabbarsList>({
  name: '',
  icon: '',
  select: '',
  pageName: ''
})
const formState = reactive<FormState>({
  pageName: '',
  isUseTabbar: false,
  tabbars: {
    active: 0,
    tabbars: []
  }
})
const iconListRef = ref<InstanceType<typeof iconList> | null>(null)

interface pageInterface {
  id: number
  name: string
}
const pageList = ref<pageInterface[]>([])
const getJsonList = async () => {
  const res = await GetJsonList()
  if (res && res.data) {
    pageList.value = res.data
  }
}

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
// 页面名称
const store = useLoginStore()
const storeMainList = useMainListStore()

const changeInputName = () => {
  storeMainList.setPageName(formState.pageName)
}
const mainPageName = computed(() => storeMainList.name)
const isFirstTabbar = computed(() => {
  if (
    storeMainList.pageSetting.isUseTabbar &&
    storeMainList.currentPageId == storeMainList.pageSetting.tabbars.tabbars[0].select
  ) {
    return true
  } else {
    return false
  }
})
watch(
  mainPageName,
  () => {
    setTimeout(() => {
      formState.pageName = storeMainList.name
    })
  },
  {
    deep: true
  }
)

const mainStatus = computed(() => storeMainList.update)
watch(
  mainStatus,
  (newVal) => {
    if (storeMainList.update == 0) {
      return
    } else if (newVal == 4) {
      validateFields()
    }
  },
  {
    deep: true
  }
)
const formRef = ref()
const validateFields = () => {
  formRef.value
    .validateFields()
    .then(() => {
      // 验证成功，可以执行提交表单等后续操作
      storeMainList.update = 5
    })
    .catch((error: any) => {
      // 验证失败，可以处理错误信息
      sendActiveKey()
      console.error('验证失败:', error)
    })
}

const sendActiveKey = () => {
  emit('send-activeKey', '1')
}
// switch
const onOk = () => {
  modalFormRef.value?.validateFields().then(() => {
    if (modalFormState.value) {
      if (isAddTabbar.value) {
        formState.tabbars.tabbars.push(modalFormState.value)
      } else {
        formState.tabbars.tabbars[isFirstPage.value] = modalFormState.value
      }
    }
    modalFormState.value = {
      name: '',
      icon: '',
      select: '',
      pageName: ''
    }
    visible.value = false
  })
  emit('receive-page-setting-data', formState)
}
const changeSelectPageName = (e: any) => {
  modalFormState.value.pageName = pageList.value.find((item: any) => item.id == e)?.name || ''
  // modalFormState.value.select = e
}
// watch(
//   visible,
//   () => {
//     modalFormState.value = {
//       name: '',
//       icon: '',
//       select: '',
//       selectList: []
//     }
//   },
//   { flush: 'post' }
// )

// 是否使用tabbar
const tabbarSwitch = () => {
  if (storeMainList.currentPageId) {
    if (formState.tabbars.tabbars.length) {
      emit('receive-page-setting-data', formState)
    } else {
      formState.tabbars = {
        active: 0,
        tabbars: [
          {
            name: '首页',
            icon: 'wap-home',
            select: storeMainList.currentPageId,
            pageName: storeMainList.name
          }
        ]
      }
      emit('receive-page-setting-data', formState)
    }
  } else {
    message.info('请先保存该页面')
    formState.isUseTabbar = false
  }
}
const openIconList = () => {
  iconListRef.value?.showModal()
}
// 接受图标名称
const receiveIcon = (icon: string) => {
  modalFormState.value.icon = icon
}
// 添加tabbar
const isAddTabbar = ref(false)
const addTabbar = () => {
  getJsonList()
  isAddTabbar.value = true
  isFirstPage.value = formState.tabbars.tabbars.length
  modalFormState.value = {
    name: '',
    icon: '',
    select: '',
    pageName: ''
  }
  visible.value = true
}
// 编辑tabbar
const isFirstPage = ref(0)
const editTabbar = (item: tabbarsList, index: number) => {
  getJsonList()
  isAddTabbar.value = false
  isFirstPage.value = index
  modalFormState.value = item
  visible.value = true
}
// 删除tabbar
const deleteTabbar = (index: number) => {
  formState.tabbars.tabbars.splice(index, 1)
}
// 接收editor组件的页面设置数据
const receivePageSettingData = (data: any) => {
  formState.pageName = data.pageName
  formState.isUseTabbar = data.isUseTabbar
  formState.tabbars = data.tabbars
}

const emit = defineEmits(['send-activeKey', 'receive-page-setting-data'])
defineExpose({ receivePageSettingData, validateFields })
// 初始化
const init = () => {
  getJsonList()
}

onMounted(async () => {
  init()
})
</script>

<template>
  <div class="overflow-auto" style="height: calc(100vh - 8rem)">
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item name="pageName" :rules="[{ required: true, message: '请输入页面名称' }]">
        <a-input
          @change="changeInputName"
          v-model:value="formState.pageName"
          placeholder="请输入页面名称"
          :class="!store.theme ? 'editor-props-input' : ''"
          addonBefore="页面名称"
        />
      </a-form-item>
      <a-form-item
        class="ant-form-item-label-dark"
        name="isUseTabbar"
        label="是否显示tabbar"
        labelAlign="left"
      >
        <a-switch @change="tabbarSwitch" v-model:checked="formState.isUseTabbar" />
      </a-form-item>
      <a-form-item v-if="formState.isUseTabbar" class="">
        <a-button
          type="dashed"
          :disabled="!isFirstTabbar"
          block
          primary
          html-type="button"
          @click="addTabbar"
          >添加tabbar</a-button
        >
      </a-form-item>
      <a-form-item
        class="ant-form-item-label-dark"
        v-if="formState.tabbars.tabbars.length && formState.isUseTabbar"
        label="tabbar"
      >
        <template v-if="formState.tabbars.tabbars">
          <ul>
            <template v-for="(user, index) in formState.tabbars.tabbars" :key="user.key">
              <li class="user flex justify-between items-center" style="margin: 4px">
                <div>
                  <a-avatar>
                    <template #icon
                      ><span class="van-icon" :class="`van-icon-${user.icon}`"></span
                    ></template>
                  </a-avatar>
                  <span class="dark:text-gray-400">{{ user.name }} - {{ user.pageName }}</span>
                </div>
                <div v-if="isFirstTabbar">
                  <span @click="editTabbar(user, index)" class="text-blue-300 cursor-pointer"
                    >编辑</span
                  >
                  <span
                    v-if="index != 0"
                    @click="deleteTabbar(index)"
                    class="text-red-500 ml-2 cursor-pointer"
                    >删除</span
                  >
                </div>
              </li>
            </template>
          </ul>
        </template>
        <template v-else>
          <a-typography-text class="ant-form-text" type="secondary">
            <SmileOutlined />
          </a-typography-text>
        </template>
      </a-form-item>

      <a-modal class="ant-modal-content-dark" v-model:open="visible" title="添加tabbar" @ok="onOk">
        <a-form ref="modalFormRef" :model="modalFormState" layout="vertical" name="userForm">
          <a-form-item name="name" label="名称" :rules="[{ required: true }]">
            <a-input v-model:value="modalFormState.name" />
          </a-form-item>
          <a-form-item
            class="ant-select-selector-dark"
            name="select"
            label="页面"
            has-feedback
            :rules="[{ required: true, message: 'Please select your country!' }]"
          >
            <a-select
              @select="changeSelectPageName"
              v-model:value="modalFormState.select"
              placeholder="Please select a country"
              :disabled="!isFirstPage"
            >
              <a-select-option v-for="item in pageList" :key="item.id" :value="item.id">{{
                item.name
              }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item name="icon" label="图标" :rules="[{ required: true }]">
            <a-input disabled v-model:value="modalFormState.icon" />
          </a-form-item>
          <a-form-item>
            <a-button type="dashed" block primary html-type="button" @click="openIconList"
              >选择图标</a-button
            >
          </a-form-item>
        </a-form>
      </a-modal>
    </a-form>
    <iconList ref="iconListRef" @receiveIcon="receiveIcon" />
  </div>
</template>
