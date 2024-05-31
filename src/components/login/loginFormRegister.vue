<script setup lang="ts">
import type { AccountLogin } from '@/api/account/model/accountModel'
import { ApiRegister } from '@/api/account/account'
import { ref, reactive } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'
import { message } from 'ant-design-vue'

const emit = defineEmits(['register-btn'])

// 登录表单
interface FormState {
  username: string
  password: string
  remember: boolean
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
})
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

// 用户注册
const Register = async () => {
  let params: AccountLogin = {
    username: formState.username,
    password: formState.password
  }
  let res = await ApiRegister(params)
  if (res.code == 1000) {
    message.success(res.success)
    emit('register-btn')
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
  <div class="text-center mt-2 mb-5 text-black font-bold dark:text-gray-300">注 册</div>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    name="basic"
    :wrapper-col="{ span: 24 }"
    autocomplete="off"
    @finish="Register"
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

    <a-form-item :wrapper-col="{ span: 24 }">
      <a-button class="w-full" type="primary" html-type="submit">注 册</a-button>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 24 }">
      <a-button
        @click="$emit('register-btn')"
        class="w-full dark:bg-gray-700 dark:text-gray-400"
        type="default"
        html-type="submit"
        >返回登录</a-button
      >
    </a-form-item>
  </a-form>
</template>
