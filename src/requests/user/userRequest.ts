import axios from 'axios'
import {Utils} from "@/requests/utils/Utils";
import {config} from '../'

export class userRequest {

  private readonly _config: config;

  constructor(configs: config) {
    this._config = configs;
  }

  private get config() {
    return this._config;
  }


  public async entry(userId: string, expectedExit: number) {
    try {
      let ret = await axios({
        baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
        url: '/api/user/entry',
        method: 'post',
        headers: await Utils.handlerHead(),
        data: {userId, expectedExit}
      });
      return ret.data;
    } catch (e) {
      return e;
    }
  }

  public async exit(userId: string) {
    try {
      let ret = await axios({
        baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
        url: '/api/user/exit',
        method: 'put',
        headers: await Utils.handlerHead(),
        data: {userId}
      });
      return ret.data;
    } catch (e) {
      return e;
    }
  }

  public async logout() {
    try {
      let ret = await axios({
        baseURL: `${this.config.protocol}://${this.config.baseUrl}:${this.config.port}/`,
        url: '/api/logout',
        method: 'get',
        headers: await Utils.handlerHead(),
      });
      return ret.data;
    } catch (e) {
      return e;
    }
  }

    public async userCdhConsult(userId: string, month: number, year: number) {
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



}


