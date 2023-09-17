import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/app/views/Home.vue';
import StaticPage from '@/app/views/Page.vue';
import Error404 from '@/app/views/errors/not_found.vue';
import Error422 from '@/app/views/errors/unprocessable_entity.vue';
import Error500 from '@/app/views/errors/server_error.vue';

const ROUTES = [
  { path: '/', component: Home, name: 'root_path' },
  { path: '/:slug', component: StaticPage, name: 'page_path' },
  { path: '/404', component: Error404, name: "not_found" },
  { path: '/422', component: Error422, name: "unprocessable_entity" },
  { path: '/500', component: Error500, name: "server_error" },
  { path: '/:catchAll(.*)', redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(`/${I18n.prefix}`),
  routes: ROUTES, 
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    // @see: https://router.vuejs.org/guide/advanced/scroll-behavior.html
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0, behavior: 'smooth' })
      }, 80)
    })
  }
});

export default router;