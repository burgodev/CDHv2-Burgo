import {adminRequests} from './admin/adminRequest';
import {openRequests} from './open/openRequest';
import {userRequest} from "@/requests/user/userRequest";

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
    Date: number,
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
  Data: {
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
}

export interface justifyAbsence {
  Data:{
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
