import { ROLES } from "./order";

export type User = {
  id: number;
  email: string;
  role: ROLES;
  password: string;
};

export type CurrentUser = {
  token: string;
  user: User;
};
