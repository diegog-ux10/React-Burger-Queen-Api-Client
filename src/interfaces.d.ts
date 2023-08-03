export enum Role {
	admin = 'admin',
	waiter = 'waiter',
	chef = 'chef'
};

export interface EventOnChange {
	target: {
		value: string;
	};
};

export interface EventPreventDefault {
	preventDefault(): void;
};

export interface IUser {
	id: number;
	email: string;
	role: Role;
	token: string;
};

export interface ILoginResponse {
	accessToken: string;
	user: IUser;
};
