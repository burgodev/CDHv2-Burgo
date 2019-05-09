import axios from 'axios';
import { Utils } from "@/requests/utils/Utils";
export class userRequest {
    constructor(configs) {
        this._config = configs;
        console.log('configsADMIN', configs);
    }
    get config() {
        return this._config;
    }
    async entry(userId, expectedExit) {
        try {
            let ret = await axios({
                baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
                url: '/api/user/entry',
                method: 'post',
                headers: await Utils.handlerHead(),
                data: { userId, expectedExit }
            });
            return ret.data;
        }
        catch (e) {
            return e;
        }
    }
    async exit(userId) {
        try {
            let ret = await axios({
                baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
                url: '/api/user/exit',
                method: 'put',
                headers: await Utils.handlerHead(),
                data: { userId }
            });
            return ret.data;
        }
        catch (e) {
            return e;
        }
    }
    async logout() {
        try {
            let ret = await axios({
                baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
                url: '/api/logout',
                method: 'get',
                headers: await Utils.handlerHead(),
            });
            return ret.data;
        }
        catch (e) {
            return e;
        }
    }
    async userCdhConsult(userId, month, year) {
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
}
//# sourceMappingURL=userRequest.js.map