import axios from 'axios'
import { useLoginStore } from '@/stores/modules/user'
import { message } from 'ant-design-vue'

const service = axios.create({
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
    if (response.data.code != 1000) {
      message.error(response.data.error)
      return
    }
    return response.data
  },
  (error) => {
    switch (error.response.status) {
      case 404:
        console.log('请求地址错误')
        return
      case 500:
        console.log('服务器错误')
        return
      default:
        break
    }
    return Promise.reject(error)
  }
)

export default service
