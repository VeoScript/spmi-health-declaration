import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import BackToTop from 'vue-backtotop';
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false;
Vue.use(BackToTop);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
