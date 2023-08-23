import { User } from "../models/user";
import { host, jsonFetch } from "./common-service";

/**
 * Get one user info by id
 * @param id
 * @returns Promise<token>
 */
export const getUser = (id: number): Promise<User> => {
  const url = host + "/users/" + id;

  if (id < 1) return Promise.reject();

  return jsonFetch({
    url,
    method: "GET",
  });
};
