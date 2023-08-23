import { Product } from "./product";

export enum ROLES {
  admin = "admin",
  waiter = "waiter",
  chef = "chef",
}

export type Order = {
  costumer: string;
  products: OrderProduct[];
};

export type OrderProduct = {
  product: Product;
  qty: number;
};
