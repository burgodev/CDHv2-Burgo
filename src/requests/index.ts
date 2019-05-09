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
    email: String,
    name: String,
    surname: String,
    password: String,
    birthday: Number,
    cpf: Number,
    entryDate: Number,
    exitDate: Number
  }
}

export interface deleteUser {
  userId: String,
}

export interface loginData {
  login: String,
  password: String
}

export interface paramsCdhConsult {
  userId: String,
  month: Number,
  Year: Number

}

export interface updateUser {
  update: object,
  email: string,
  name: string,
  surname: string,
  birthday: number,
  cpf: number,
  entryDate: number,
  exitDate: number,
}


export interface entry{
  userId: number,
  expectedExit: number
}
