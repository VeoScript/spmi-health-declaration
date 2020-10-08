import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/v",
    name: "home",
    component: () => import('@/views/Home'),
    children: [
      {
        path: 'health-checklist',
        name: 'health-checklist',
        component: () => import('@/components/pages/home-health-check-list')
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
});

export default router;
