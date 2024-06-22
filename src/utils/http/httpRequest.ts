import axios from 'axios'
import { useLoginStore } from '@/stores/modules/user'
import { message } from 'ant-design-vue'
import router from '@/router/index'

const service = axios.create({
  // baseURL: 'http://192.168.100.238:8000',
  baseURL: 'http://localhost:8000',
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    const store = useLoginStore()
    config.data = JSON.stringify(config.params)
    if (store.token) {
      config.headers['Authorization'] = store.token
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return response.data
    }
    if (response.status == 204) {
      message.success('删除成功')
      return response.data
    }
    if (response.status == 205) {
      message.success('保存成功')
      return response.data
    }
    if (response.status == 206) {
      // message.success('下载成功')
      return response.data
    }
    if (response.status == 207) {
      message.success('打包成功')
      return response.data
    }

    message.error(response.data.error)
    return
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        message.error('传入的文件名错误')
        return
      case 402:
        message.error('文件不存在')
        return
      case 404:
        console.log('请求地址错误')
        message.error(error.response.data.detail)
        return
      case 500:
        console.log('服务器错误')
        message.error(error.response.data.detail)
        return
      case 403:
        console.log('token失效')
        router.replace({ name: 'LoginFrom' })
        return
      default:
        message.error(error.response)
        break
    }
    return Promise.reject(error)
  }
)

export default service
