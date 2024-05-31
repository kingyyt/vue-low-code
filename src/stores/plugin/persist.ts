import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //pinia持久化
import type { Pinia } from 'pinia'
export function loginPiniaPersistPlugin(pinia: Pinia) {
  pinia.use(piniaPluginPersistedstate)
}
