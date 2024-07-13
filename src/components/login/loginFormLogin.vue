<script setup lang="ts">
import { ApiLogin } from '@/api/account/account'
import { useLoginStore } from '@/stores/modules/user'
import { ref, reactive } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'
import { useRouter } from 'vue-router'

defineEmits(['register-btn'])
const router = useRouter()

// 登录表单
interface FormState {
  username: string
  password: string
  remember: boolean
}
const formState = reactive<FormState>({
  username: 'admin',
  password: '123123',
  remember: true
})
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

// 用户登录
const Login = async () => {
  const store = useLoginStore()
  let params = {
    username: formState.username,
    password: formState.password
  }
  let res = await ApiLogin(params)
  store.setToken(res.token)
  if (res.token) {
    router.push('/home')
  }
}

// 校验
const formRef = ref<FormInstance>()

const validateUsername = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('用户名不能为空')
  }
  return Promise.resolve()
}
const validatePassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('密码不能为空')
  }
  return Promise.resolve()
}

const rules: Record<string, Rule[]> = {
  username: [{ required: true, validator: validateUsername, trigger: 'change' }],
  password: [{ required: true, validator: validatePassword, trigger: 'change' }]
}
const handleValidate = (...args: any[]) => {
  console.log(args)
}
</script>

<template>
  <div class="text-center mt-2 mb-5 text-black font-bold dark:text-gray-300">登 录</div>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    name="basic"
    :wrapper-col="{ span: 24 }"
    autocomplete="off"
    @finish="Login"
    @finishFailed="onFinishFailed"
    @validate="handleValidate"
  >
    <a-form-item name="username" class="flex-none max-w-full">
      <a-input class="dark:bg-gray-700 dark:border-gray-400" v-model:value="formState.username" />
    </a-form-item>

    <a-form-item name="password" class="flex-none max-w-full">
      <a-input-password
        class="dark:bg-gray-700 dark:border-gray-400"
        v-model:value="formState.password"
      />
    </a-form-item>

    <div class="flex justify-between">
      <a-form-item name="remember" :wrapper-col="{ span: 24 }">
        <a-checkbox class="text-nowrap" v-model:checked="formState.remember"
          ><span class="dark:text-gray-300">记住我</span></a-checkbox
        >
      </a-form-item>
      <div class="text-right text-blue-500 cursor-pointer" @click="$emit('register-btn')">
        注册账号
      </div>
    </div>

    <a-form-item :wrapper-col="{ span: 24 }">
      <a-button class="w-full" type="primary" html-type="submit">登 录</a-button>
    </a-form-item>
  </a-form>
</template>
