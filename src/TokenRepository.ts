import { IUser } from "./interfaces";

const tokenKey = 'token';
const tokenUserId = 'userId';

/**
 * set user token and id in local storage
 * @param user 
 */
export const createSession = (user: IUser) => {
	localStorage.setItem(tokenUserId, user.id.toString());
	localStorage.setItem(tokenKey, user.token);
};

/**
 * remove the local storage token and id
 */
export const deleteSession = () => {
	localStorage.removeItem(tokenUserId);
	localStorage.removeItem(tokenKey);
};

/**
 * get the session from local storage
 * @returns token and user id
 */
export const getSession = () => {
	return {
		token: localStorage.getItem(tokenKey),
		userId: Number(localStorage.getItem(tokenUserId))
	};
}
