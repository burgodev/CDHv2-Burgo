import { adminRequests } from './admin/adminRequest';
import { openRequests } from './open/openRequest';
import { userRequest } from "@/requests/user/userRequest";
import Vue from 'vue';
import Vuex from 'vuex';
import { profile } from '@/profile/index.ts';
Vue.use(Vuex);
const store = {
    state: {
        version: '1.0.0' // a simple property
    },
    modules: {
        profile
    }
};
export default new Vuex.Store(store);
let configs = {
    port: 1337,
    protocol: 'http',
    baseUrl: 'localhost',
};
let AdminRequest = new adminRequests(configs);
let OpenRequest = new openRequests(configs);
let UserRequest = new userRequest(configs);
export { AdminRequest as AdminAPI };
export { OpenRequest as OpenAPI };
export { UserRequest as UserAPI };
