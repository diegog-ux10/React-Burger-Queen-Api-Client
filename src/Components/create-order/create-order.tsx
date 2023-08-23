import { EventOnChange } from "../../models/event";
import { Order, OrderProduct } from "../../models/order";
import { Product } from "../../models/product";
import OrderProductList from "../order-product-list/order-product-list";

import "./create-order.css";

type CreateOrderProps = {
  order: Order;
  onAddProduct: (product: Product) => void;
  onRemoveProduct: (product: Product) => void;
  onChangeCustomer: (e: EventOnChange) => void;
};

const CreateOrder: React.FC<CreateOrderProps> = ({
  onRemoveProduct: handleRemoveProduct,
  onAddProduct: handleAddProduct,
  order,
  onChangeCustomer: handleChangeCostumer,
}) => {
  return (
    <>
      <h2>Create order</h2>
      <OrderProductList
        order={order}
        addProduct={handleAddProduct}
        removeProduct={handleRemoveProduct}
      />
      <div className="create-order-total-cost">
        {" "}
        Total cost: $
        {order.products.reduce(
          (memo: number, item: OrderProduct) =>
            item.product.price * item.qty + memo,
          0
        )}
      </div>
      <form action="">
        <label htmlFor="costumer-name">Costumer name:</label>
        <input
          type="text"
          required
          name="costumer-name"
          id="costumer-name"
          value={order.costumer}
          onChange={handleChangeCostumer}
        />
        <button
          disabled={order.costumer === "" || order.products.length === 0}
          type="submit"
        >
          Create new order
        </button>
      </form>
    </>
  );
};

export default CreateOrder;
