import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/common/views/HomeView.vue';

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/home', component: Home },
        { path: '/', redirect: '/home' }
    ],
});