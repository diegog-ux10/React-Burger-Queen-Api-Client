import { useEffect, useState } from "react";
import { getProducts } from "../Services/ProductRepository";
import { PRODUCT_TYPE, IProduct } from "../Models/Product.d";
import { EventOnChange } from "../Models/Event.d";
import { IOrder, IOrderProduct, } from "../Models/Order.d";
import ProductList from "../Components/ProductList/ProductList";
import OrderProductList from "../Components/OrderProductList/OrderProductList";
import "./Waiter.css"

const ADD_PRODUCT = true;
const REMOVE_PRODUCT = false;

interface WaiterProps {

}

const Waiter: React.FC<WaiterProps> = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [activeTab, setActiveTab] = useState(PRODUCT_TYPE.breakfast);
	const [order, setOrder] = useState<IOrder>({ costumer: "", products: [] });
	const [costumer, setCostumer] = useState<string>("");
	const tabButtonClass = (prodType: PRODUCT_TYPE) => activeTab === prodType ? "" : "pseudo";
	const handleChangeCostumer = (e: EventOnChange) => setCostumer(e.target.value);

	/**
	 * add or remove product from order product list
	 * @param add 
	 * @param productToModify 
	 * @param order 
	 * @returns new product list
	 */
	const calcAddOrRemoveProductList = (add: boolean, productToModify: IProduct, order: IOrder) => {
		const modifier = add ? 1 : -1;
		const alreadyInList = order.products.find((p: IOrderProduct) => p.product.id === productToModify.id);
		const mappedList =
			order.products.map((p: IOrderProduct) => {
				const isThis = p.product.id === productToModify.id;

				return {
					...p,
					qty: isThis ? p.qty + modifier : p.qty
				}
			});
		const thisProd = {
			product: productToModify,
			qty: modifier
		};
		const newList = alreadyInList ? mappedList : [...order.products, thisProd];
		return newList.filter(({ qty }) => qty > 0);
	};

	const modifyProductList = (add: boolean, productToModify: IProduct) =>
		setOrder({
			...order,
			products: calcAddOrRemoveProductList(add, productToModify, order)
		});
	const handleAddProduct = modifyProductList.bind(null, ADD_PRODUCT);
	const handleRemoveProduct = modifyProductList.bind(null, REMOVE_PRODUCT);

	useEffect(() => {
		getProducts().then((newProducts) => {
			setProducts(newProducts);
		});
	}, []);

	return (<>
		<h1>Waiter</h1>
		<div id="product-container">
			<section>
				<h2>Products</h2>
				<div id="tab-container">
					<button className={tabButtonClass(PRODUCT_TYPE.breakfast)}
						onClick={() => setActiveTab(PRODUCT_TYPE.breakfast)}
					>
						Breakfast
					</button>
					<button className={tabButtonClass(PRODUCT_TYPE.lunch)}
						onClick={() => setActiveTab(PRODUCT_TYPE.lunch)}
					>
						Lunch
					</button>
				</div>
				<ProductList
					products={products.filter((product: IProduct) => product.type === activeTab)}
					addProduct={handleAddProduct}
				/>
			</section>
			<section>
				<h2>Create order</h2>
				<OrderProductList
					order={order}
					addProduct={handleAddProduct}
					removeProduct={handleRemoveProduct}
				/>
				<form action="">
					<label htmlFor="costumer-name">Costumer name:</label>
					<input type="text" required name="costumer-name" id="costumer-name" value={costumer} onChange={handleChangeCostumer} />
					<button disabled={costumer === "" || order.products.length === 0} type="submit">Create new order</button>
				</form>
			</section>
		</div>
	</>);
}

export default Waiter;
