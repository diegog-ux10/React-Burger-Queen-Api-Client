import { IUser } from "../Models/interfaces.d";
import { host, jsonFetch } from "./Common.service";

/**
 * Get one user info by id
 * @param id 
 * @returns Promise<token>
 */
export function getUser(id: number):Promise<IUser> {
	const url = host + "/users/" + id;

	return jsonFetch({
		url,
		method: "GET"
	});
}
