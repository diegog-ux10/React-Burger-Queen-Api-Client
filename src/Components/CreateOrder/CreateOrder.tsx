import { EventOnChange } from "../../Models/Event.d";
import { IOrder, IOrderProduct } from "../../Models/Order.d";
import { IProduct } from "../../Models/Product.d";
import OrderProductList from "../OrderProductList/OrderProductList";
import "./CreateOrder.css";

interface CreateOrderProps {
	order: IOrder;
    onAddProduct: (product: IProduct) => void;
	onRemoveProduct: (product: IProduct) => void;
	onChangeCustomer: (e: EventOnChange) => void;
};

const CreateOrder: React.FC<CreateOrderProps> = ({onRemoveProduct: handleRemoveProduct, onAddProduct: handleAddProduct, order, onChangeCustomer: handleChangeCostumer}) => {

	return (<>
		<h2>Create order</h2>
		<OrderProductList
			order={order}
			addProduct={handleAddProduct}
			removeProduct={handleRemoveProduct}
		/>
		<div className="create-order-total-cost"> Total cost: ${order.products.reduce((memo: number, item: IOrderProduct) => item.product.price * item.qty + memo, 0)}</div>
		<form action="">
			<label htmlFor="costumer-name">Costumer name:</label>
			<input type="text" required name="costumer-name" id="costumer-name" value={order.costumer} onChange={handleChangeCostumer} />
			<button disabled={order.costumer === "" || order.products.length === 0} type="submit">Create new order</button>
		</form>
	</>);
}

export default CreateOrder;
