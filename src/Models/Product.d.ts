export enum PRODUCT_TYPE {
  breakfast = "Desayuno",
  lunch = "Almuerzo",
}

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  type: PRODUCT_TYPE;
  dateEntry: string;
};
