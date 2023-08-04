import { IProduct } from "../Models/interfaces.d";
import { host, jsonFetch } from "./Common.service";

/**
 * Get one user info by id
 * @param id 
 * @returns Promise<token>
 */
export function getProducts():Promise<IProduct[]> {
	const url = host + "/products";

	return jsonFetch({
		url,
		method: "GET"
	});
}
