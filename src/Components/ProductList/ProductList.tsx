import { IProduct } from "../../Models/interfaces.d";
import "./ProductList.css";

function ProductList({products, addProduct}: {products: IProduct[], addProduct: (p: IProduct) => void}) {

	return (
	<ul id="product-list-container">
		{[...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products].map((product: IProduct) => (
			<li key={product.id} onClick={() => addProduct(product)}>
				{product.name}
				<img src={product.image} alt={product.name} />
				${product.price}
			</li>
		))}
	</ul>
	);
}
export default ProductList;
