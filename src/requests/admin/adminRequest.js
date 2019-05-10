import axios from 'axios';
import { Utils } from "@/requests/utils/Utils";
export class adminRequests {
    constructor(configs) {
        this._config = configs;
        console.log('configsADMIN', configs);
    }
    get config() {
        return this._config;
    }
    async readAllUsers() {
        try {
            let ret = await axios({
                baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
                url: 'api/admin/user/read',
                method: 'get',
                headers: await Utils.handlerHead(),
            });
            return ret.data;
        }
        catch (e) {
            return e;
        }
    }
    async createUser(data) {
        try {
            let ret = await axios({
                baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
                url: '/api/admin/user/create',
                method: 'post',
                data: data,
                headers: await Utils.handlerHead(),
            });
            return ret.data;
        }
        catch (e) {
            return e;
        }
    }
    async deleteUser(userId) {
        try {
            let ret = await axios({
                baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
                url: `/api/admin/user/delete/${userId}`,
                method: 'delete',
                headers: await Utils.handlerHead(),
            });
            return ret.data;
        }
        catch (e) {
            return e;
        }
    }
    async updateUser(update) {
        try {
            let ret = await axios({
                baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
                url: '/api/admin/user/update',
                method: 'put',
                data: { update },
                headers: await Utils.handlerHead(),
            });
            return ret.data;
        }
        catch (e) {
            return e;
        }
    }
    async adminCdhConsult(userId, month, year) {
        try {
            let ret = await axios({
                baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
                url: `/api/user/report/${userId}/${month}/${year}`,
                method: 'get',
                headers: await Utils.handlerHead(),
            });
            return ret.data;
        }
        catch (e) {
            return e;
        }
    }
    async justifyAbsence(data) {
        try {
            let ret = await axios({
                baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
                url: '/api/admin/user/justify/update/',
                method: 'post',
                data: data,
                headers: await Utils.handlerHead(),
            });
            return ret.data;
        }
        catch (e) {
            return e;
        }
    }
}
//# sourceMappingURL=adminRequest.js.map