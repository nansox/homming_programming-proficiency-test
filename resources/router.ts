import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/common/views/HomeView.vue';
import PropertiesMainView from './modules/properties/views/PropertiesMainView.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/home', component: Home, children: [
                { path: 'properties', component: PropertiesMainView }
            ]
        },
        { path: '/', redirect: '/home' }
    ],
});
