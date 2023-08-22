import { ROLES } from "./order";

export interface ICurrentUser {
  token: string;
  user: IUser;
}

export interface IUser {
  id: number;
  email: string;
  role: ROLES;
  password: string;
}
