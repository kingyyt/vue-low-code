import type { Router } from 'vue-router'
import { useLoginStore } from '@/stores/modules/user'
// import { useRouter } from 'vue-router'

// const router = useRouter()
export function setupRouterGuard(router: Router) {
  createPageGuard(router)
}
// 判断是否登录
function isLoggedIn() {
  const store = useLoginStore()
  if (!store.token) {
    return true
  }
  return false
}
function createPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (to.path !== '/login' && isLoggedIn()) {
      next('/login')
    }
    if (to.path === '/' && !isLoggedIn()) {
      next('/home')
    } else {
      next()
    }
  })
}
