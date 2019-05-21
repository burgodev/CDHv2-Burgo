import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import LoginBurgo from './views/LoginBurgo.vue';
import AdminCDH from './views/AdminCDH.vue';
import UsersBurgo from './views/UsersBurgo.vue';
import UserCDH from './views/UserCDH.vue';
Vue.use(Router);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/loginBurgo',
            name: 'loginBurgo',
            component: LoginBurgo
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
