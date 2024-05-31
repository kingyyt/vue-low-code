import { createRouter, createWebHistory } from 'vue-router'
import LoginFrom from '@/views/sys/login/LoginFrom.vue'
import homePage from '@/views/home/homePage.vue'
import errorPage from '@/views/sys/error/errorPage.vue'
import microMain from '@/views/microPage/microMain.vue'
import testMain from '@/views/microPage/testMain.vue'
import subMenu from '@/views/home/subMenu.vue'

const routes = [
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: errorPage },
  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
  // { path: '/user-:afterUser(.*)', component: errorPage },
  {
    path: '/login',
    name: 'LoginFrom',
    component: LoginFrom
  },
  {
    path: '/home',
    name: 'homePage',
    component: homePage,
    children: [
      {
        path: '/microMain',
        name: 'microMain',
        component: microMain
      },
      {
        path: '/testMain',
        name: 'testMain',
        component: testMain
      },
      {
        path: '/subMenu',
        name: 'subMenu',
        component: subMenu
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
