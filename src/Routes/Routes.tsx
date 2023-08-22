import Home from "../pages/home";
import Login from "../pages/login";
import Layout from "../pages/layout";
import { ProtectedRoute } from "./protected-route";
import Admin from "../pages/admin";
import Waiter from "../pages/waiter";

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
};

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
            ],
          },
          {
            path: PATHNAMES.PRODUCTS,
            element: <Admin />,
          },
          {
            path: PATHNAMES.USERS,
            element: <Admin />,
          },
        ],
      },
    ],
  },
];
