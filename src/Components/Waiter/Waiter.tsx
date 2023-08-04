import { useEffect, useState } from "react";
import { getProducts } from "../../Services/Product.service";
import { EProductType, EventOnChange, IOrder, IOrderProduct, IProduct } from "../../Models/interfaces.d";
import "./Waiter.css"
import ProductList from "../ProductList/ProductList";
import OrderProductList from "../OrderProductList/OrderProductList";

const ADD_PRODUCT = true;
const REMOVE_PRODUCT = false;

function Waiter() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [activeTab, setActiveTab] = useState(EProductType.breakfast);
	const [order, setOrder] = useState<IOrder>({costumer: "", products: []});
	const [costumer, setCostumer] = useState<string>("");
	const tabButtonClass = (prodType: EProductType) => activeTab === prodType ? "" : "pseudo";
	const handleChangeCostumer = (e: EventOnChange) => setCostumer( e.target.value );
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
					<button className={tabButtonClass(EProductType.breakfast)}
						onClick={() => setActiveTab(EProductType.breakfast)}
						>
						Breakfast
					</button>
					<button className={tabButtonClass(EProductType.lunch)}
						onClick={() => setActiveTab(EProductType.lunch)}
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
					<label htmlFor="costumer-name">Costumer:</label>
					<input type="text" required name="costumer-name" id="costumer-name" value={costumer} onChange={handleChangeCostumer} />
					<button disabled={costumer === "" || order.products.length === 0} type="submit">Create new order</button>
				</form>
			</section>
		</div>
	</>);
}

/**
 * add or remove product from order product list
 * @param add 
 * @param productToModify 
 * @param order 
 * @returns new product list
 */
function calcAddOrRemoveProductList (add: boolean, productToModify: IProduct, order: IOrder) {
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
	return newList.filter(({qty}) => qty > 0);
};

export default Waiter;
