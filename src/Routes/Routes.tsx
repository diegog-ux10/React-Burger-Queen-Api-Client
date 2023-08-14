import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Layout from '../Pages/Layout';
import { ProtectedRoute } from './ProtectedRoute';
import Admin from '../Pages/Admin';
import Waiter from '../Pages/Waiter';

export const PATHNAMES = {
	HOME: "/home",
	LOGIN: "/login",
	ORDERS: "/orders",
	PRODUCTS: "/products",
	USERS: "/users",
	CREATE: "create",
	PENDING: "pending",
	DELIVERING: "delivering",
	DELIVERED: "delivered",
}

export const ROUTES = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: PATHNAMES.LOGIN,
				element: <Login />,
			},
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: PATHNAMES.HOME,
						element: <Home />,
					},
					{
						path: PATHNAMES.ORDERS,
						children: [
							{
								path: PATHNAMES.CREATE,
								element: <Waiter />,
							},
						]
					},
					{
						path: PATHNAMES.PRODUCTS,
						element: <Admin />,
					},
					{
						path: PATHNAMES.USERS,
						element: <Admin />,
					}
				]
			},
		]
	}
];