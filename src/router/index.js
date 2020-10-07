import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import('@/views/Home')
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
