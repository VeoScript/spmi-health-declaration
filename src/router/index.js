import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from '@/services'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: () => import('@/views/Welcome')
  },
  {
    path: "/v",
    name: "home",
    component: () => import('@/views/Home'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'health-checklist',
        name: 'health-checklist',
        component: () => import('@/components/pages/home-health-check-list/Index')
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    component: () => import('@/views/About')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (!requiresAuth && currentUser) {
    next('/v/health-checklist')
  } else {
    next()
  }
})

export default router
