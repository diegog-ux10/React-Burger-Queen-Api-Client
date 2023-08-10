import { ICurrentUser } from "../Models/interfaces.d";

const tokenKey = 'token';
const tokenUserId = 'userId';

/**
 * set user token and id in local storage
 * @param currentUser 
 */
export const createSession = (currentUser: ICurrentUser) => {
	localStorage.setItem(tokenUserId, currentUser.user.id.toString());
	localStorage.setItem(tokenKey, currentUser.token);
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
