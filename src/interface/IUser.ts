import { PasswordProps } from "antd/es/input";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: IRole;
  roleId: number;
}

export interface IRole {
  id: number;
  role_name: string;
}

export interface IEditProfile {
  id: number;
  name: string;
  email: string;
  img: string;
  tel: string;
}

export interface ISignin {
  email: string;
  password: string;
}

export interface IProfile {
  id?: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  img?: string;
  tel?: string;
  roleId?: number;
  createAt?: string;
  deleteAt?: null;
  UpdateAt?: string;
}
