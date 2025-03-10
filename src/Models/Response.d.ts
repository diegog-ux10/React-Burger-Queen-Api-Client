import { IUser } from "./User";

export interface ILoginResponse {
	accessToken: string;
	user: IUser;
};

export interface IJsonFetchParams {
	url: string;
	method: string;
	body?: Object;
}
