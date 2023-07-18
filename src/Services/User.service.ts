import { host } from "./Common.service";

/**
 * Get one user info by id
 * @param id 
 * @returns Promise<token>
 */
export function getUser(id: string) {
	const url = host + "/users/" + id;

	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => response.json())
}
