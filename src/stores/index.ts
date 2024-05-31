import type { App } from 'vue'
import { createPinia } from 'pinia'
import { loginPiniaPersistPlugin } from '@/stores/plugin/persist'

const store = createPinia()
loginPiniaPersistPlugin(store)

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
