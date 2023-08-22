import { IProduct } from "./product";

export enum ROLES {
  admin = "admin",
  waiter = "waiter",
  chef = "chef",
}

export interface IOrder {
  costumer: string;
  products: IOrderProduct[];
}

export interface IOrderProduct {
  product: IProduct;
  qty: number;
}
