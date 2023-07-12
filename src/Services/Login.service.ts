/**
 * Login user email and password
 * @param email 
 * @param password 
 * @returns Promise<token>
 */
export function login(email: string, password: string) {
	const url = "http://localhost:8080/login",
		data = { email, password };

	return fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => response.json())
}
