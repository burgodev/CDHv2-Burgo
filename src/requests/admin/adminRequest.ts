import axios from 'axios';
import {config, createUser, deleteUser, updateUser, justifyAbsence} from '../'
import {Utils} from "@/requests/utils/Utils";

export class adminRequests {

  private readonly _config: config;

  constructor(configs: config) {
    this._config = configs;
  }

  private get config() {
    return this._config;
  }

  public async readAllUsers() {
    try {
      let ret = await axios({
        baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
        url: 'api/admin/user/read',
        method: 'get',
        headers: await Utils.handlerHead(),
      });
      return ret.data;
    } catch (e) {
      return e;
    }
  }

  public async createUser(data: createUser) {
    try {
      let ret = await axios({
        baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
        url: '/api/admin/user/create',
        method: 'post',
        data: data,
        headers: await Utils.handlerHead(),
      });
      return ret.data;
    } catch (e) {
      return e;
    }
  }

  public async deleteUser(userId: deleteUser) {
    try {
      let ret = await axios({
        baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
        url: `/api/admin/user/delete/${userId}`,
        method: 'delete',
        headers: await Utils.handlerHead(),
      });
      return ret.data;
    } catch (e) {
      return e;
    }
  }


  public async updateUser(update: any) {
    try {
      let ret = await axios({
        baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
        url: '/api/admin/user/update',
        method: 'put',
        data: update,
        headers: await Utils.handlerHead(),
      });
      return ret.data;
    } catch (e) {
      return e;
    }
  }

  public async adminCdhConsult(userId: string, month: number, year: number) {
    try {
      let ret = await axios({
        baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
        url: `/api/user/report/${userId}/${month}/${year}`,
        method: 'get',
        headers: await Utils.handlerHead(),
      });
      return ret.data;
    } catch (e) {
      return e;
    }
  }

  public async justifyAbsence(update: justifyAbsence) {
    // public async justifyAbsence(data: {}){
    try {
      let ret = await axios({
        baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
        url: '/api/admin/user/justify/update/',
        method: 'put',
        data: update,
        headers: await Utils.handlerHead(),
      });
      return ret.data;
    } catch (e) {
      return e;
    }
  }


}
