import Vue from 'vue';
import App from './App.vue';
import './index.css';
import VueRouter from 'vue-router';
import router from '@/router';
import Vuex from 'vuex'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
