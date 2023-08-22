import { IUser } from "./user";

export interface ILoginResponse {
  accessToken: string;
  user: IUser;
}

export interface IJsonFetchParams<TBody = any> {
  url: string;
  method: string;
  body?: TBody;
}
