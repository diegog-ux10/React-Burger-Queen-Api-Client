import { useEffect, useState } from "react";

import { getProducts } from "../services/product-repository";
import { PRODUCT_TYPE, Product } from "../models/product.d";
import { EventOnChange } from "../models/event";
import { Order, OrderProduct } from "../models/order";
import ProductList from "../components/product-list/product-list";
import CreateOrder from "../components/create-order/create-order";

import "./Waiter.css";

const ADD_PRODUCT = true;
const REMOVE_PRODUCT = false;

const Waiter: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState(PRODUCT_TYPE.breakfast);
  const [order, setOrder] = useState<Order>({ costumer: "", products: [] });
  const tabButtonClass = (prodType: PRODUCT_TYPE) =>
    activeTab === prodType ? "" : "pseudo";
  const handleChangeCustomer = (e: EventOnChange) =>
    setOrder({ ...order, costumer: e.target.value });

  /**
   * add or remove product from order product list
   * @param add
   * @param productToModify
   */
  const modifyProductList = (add: boolean, productToModify: Product) => {
    const modifier = add ? 1 : -1;
    const alreadyInList = order.products.find(
      (p: OrderProduct) => p.product.id === productToModify.id,
    );
    const mappedList = order.products.map((p: OrderProduct) => {
      const isThis = p.product.id === productToModify.id;

      return {
        ...p,
        qty: isThis ? p.qty + modifier : p.qty,
      };
    });
    const thisProd = {
      product: productToModify,
      qty: modifier,
    };
    const newList = alreadyInList ? mappedList : [...order.products, thisProd];

    setOrder({
      ...order,
      products: newList.filter(({ qty }) => qty > 0),
    });
  };
  const handleAddProduct = (product: Product) =>
    modifyProductList(ADD_PRODUCT, product);
  const handleRemoveProduct = (product: Product) =>
    modifyProductList(REMOVE_PRODUCT, product);

  useEffect(() => {
    getProducts().then((newProducts) => {
      setProducts(newProducts);
    });
  }, []);

  return (
    <>
      <h1>Waiter</h1>
      <div className="product-container">
        <section>
          <h2>Products</h2>
          <div>
            <button
              className={tabButtonClass(PRODUCT_TYPE.breakfast)}
              onClick={() => setActiveTab(PRODUCT_TYPE.breakfast)}
            >
              Breakfast
            </button>
            <button
              className={tabButtonClass(PRODUCT_TYPE.lunch)}
              onClick={() => setActiveTab(PRODUCT_TYPE.lunch)}
            >
              Lunch
            </button>
          </div>
          <ProductList
            products={products.filter(
              (product: Product) => product.type === activeTab,
            )}
            onAddProduct={handleAddProduct}
          />
        </section>
        <section>
          <CreateOrder
            order={order}
            onRemoveProduct={handleRemoveProduct}
            onAddProduct={handleAddProduct}
            onChangeCustomer={handleChangeCustomer}
          />
        </section>
      </div>
    </>
  );
};

export default Waiter;
