import { ILoginResponse } from "../Models/interfaces.d";
import { host, jsonFetch } from "./Common.service";

/**
 * Login user email and password
 * @param email 
 * @param password 
 * @returns Promise<token>
 */
export function login(email: string, password: string): Promise<ILoginResponse> {
	const url = host + "/login";
	const data = { email, password };

	return jsonFetch({
		url: url,
		method: "POST",
		body: data
	})
}
