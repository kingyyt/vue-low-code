import '@/design/index.less'

import { createApp } from 'vue'

import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'

import App from './App.vue'
import router from './router'
import { setupRouterGuard } from '@/router/guard'
import { setupStore } from '@/stores'
import '@/assets/index.css'

const app = createApp(App)

app.use(router)

// 配置 store
setupStore(app)

// 路由守卫
setupRouterGuard(router)

// antd
app.use(Antd)

app.mount('#app')
