import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import AdminCDH from './views/AdminCDH.vue';
import Users from './views/Users.vue';
import UserCDH from './views/UserCDH.vue';
import ToDoWithoutStore from './components/ToDoWithoutStore.vue';
Vue.use(Router);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
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
            path: '/users',
            name: 'Users',
            component: Users
        },
        {
            path: '/ToDoWithoutStore',
            name: 'ToDoWithoutStore',
            component: ToDoWithoutStore
        },
    ]
});
