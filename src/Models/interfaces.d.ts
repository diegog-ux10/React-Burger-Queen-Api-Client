export enum ERole {
	admin = 'admin',
	waiter = 'waiter',
	chef = 'chef'
};

export enum EProductType {
	breakfast = 'Desayuno',
	lunch = 'Almuerzo'
};

export interface EventOnChange {
	target: {
		value: string;
	};
};

export interface EventPreventDefault {
	preventDefault(): void;
};

export interface ICurrentUser {
	token: string;
	user: IUser;
};

export interface IUser {
	id: number;
	email: string;
	role: ERole;
	password: string;
};

export interface ILoginResponse {
	accessToken: string;
	user: IUser;
};

export interface IJsonFetchParams {
	url: string;
	method: string;
	body?: Object;
}

export interface IProduct {
	id: number;
	name: string;
	price: number;
	image: string;
	type: EProductType;
	dateEntry: string;
};

export interface IOrderProduct {
    product: IProduct;
	qty: number;
};

export interface IOrder {
	costumer: string;
    products: IOrderProduct[];
};
