<script setup lang="ts">
import { onMounted, watch, computed, reactive, ref } from 'vue'
import { useMainListStore } from '@/stores/modules/microPage'
import { useLoginStore } from '@/stores/modules/user'
// 表单
interface FormState {
  pageName: string
}

const formState = reactive<FormState>({
  pageName: ''
})
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
watch(
  mainPageName,
  (newVal, oldVal) => {
    formState.pageName = newVal
  },
  {
    deep: true
  }
)
//

const mainStatus = computed(() => storeMainList.update)
watch(
  mainStatus,
  (newVal, oldVal) => {
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
      console.error('验证失败:', error)
    })
}
// 初始化
const init = () => {}

onMounted(async () => {
  init()
})
</script>

<template>
  <div>
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

      <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item> -->
    </a-form>
  </div>
</template>
