import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from '@/services'
import './../../node_modules/nprogress/nprogress.css';

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
      },
      {
        path: 'daily-records',
        name: 'daily-records',
        component: () => import('@/components/pages/home-daily-records/Index')
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/components/pages/home-account/Index')
      },
      {
        path: "about",
        name: "about",
        component: () => import('@/views/About')
      },
      {
        path: "help",
        name: "help",
        component: () => import('@/views/Help')
      },
      {
        path: "terms-condition",
        name: "terms-condition",
        component: () => import('@/views/TermsAndCondition')
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/components/pages/home-administrator/Index'),
        children: [
          {
            path: 'company',
            name: 'company',
            component: () => import('@/components/pages/home-administrator/company/Index')
          },
          {
            path: 'company/user/:id',
            name: 'user-info',
            component: () => import('@/components/pages/home-administrator/user/Index')
          }
        ]
      }
    ]
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


router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  NProgress.configure({ easing: 'ease', speed: 2000, showSpinner: false })
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
  window.scrollTo(0, 0)
})

export default router
