import {adminRequests} from './admin/adminRequest';
import {openRequests} from './open/openRequest';
import {userRequest} from "@/requests/user/userRequest";
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/types';
import { profile } from '@/profile/index.ts';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0' // a simple property
  },
  modules: {
    profile
  }
};

export default new Vuex.Store<RootState>(store);

let configs: config = {
  port: 1337,
  protocol: 'http',
  baseUrl: 'localhost',
};


let AdminRequest = new adminRequests(configs);
let OpenRequest = new openRequests(configs);
let UserRequest = new userRequest(configs);

export {AdminRequest as AdminAPI};
export {OpenRequest as OpenAPI};
export {UserRequest as UserAPI};


export interface config {
  port: number,
  protocol: string,
  baseUrl: string,
}

export interface createUser {
  Data: {
    email: string,
    name: string,
    surname: string,
    password: string,
    birthday: number,
    cpf: number,
    date: number,
    exitDate: number,
    isAdmin: boolean
  }
}

export interface deleteUser {
  userId: string,
}

export interface loginData {
  login: string,
  password: string
}

export interface paramsCdhConsult {
  userId: string,
  month: number,
  Year: number

}

export interface updateUser {
    id: string,
    update: {
      email?: string,
      name?: string,
      surname?: string,
      birthday?: number,
      cpf?: number,
      entryDate?: number,
      exitDate?: number,
    }
}

export interface justifyAbsence {
  update: {
    userId: string,
    currentTimeRegister: string,
    year: number,
    month: number,
    day: number,
    justification: {
      text: string,
      time: number
    }
  }
}
