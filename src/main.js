  
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import BackToTop from 'vue-backtotop';
import VueCompositionAPI from '@vue/composition-api'
import { auth, apolloProvider  } from '@/services' 

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false;
Vue.use(BackToTop);

let app = ''

auth.onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      apolloProvider,
      render: h => h(App)
    }).$mount("#app")
  }
})