import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import AdminCDH from './views/AdminCDH.vue';
import UsersBurgo from './views/UsersBurgo.vue';
import UserCDH from './views/UserCDH.vue';
Vue.use(Router);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },

        {
            path: '/AdminCDH',
            name: 'AdminCDH',
            component: AdminCDH
        },
        {
            path: '/userCDH',
            name: 'userCDH',
            component: UserCDH
        },
        {
            path: '/usersburgo',
            name: 'UsersBurgo',
            component: UsersBurgo
        },

    ]
});
