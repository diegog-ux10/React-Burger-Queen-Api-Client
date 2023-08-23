import { User } from "./user";

export type LoginResponse = {
  accessToken: string;
  user: User;
}

export type JsonFetchParams<TBody = any> = {
  url: string;
  method: string;
  body?: TBody;
}
