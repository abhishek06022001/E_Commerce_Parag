import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ErrorPage from "../pages/ErrorPage";
import CommonPage from "../pages/CommonPage";
import Product from "../pages/Product";
import ProductComponent from "../components/ProductComponent";
import Profile from "../pages/Profile";
import { PrivateRoute } from "./PrivateRoute";
import Users from "../pages/user_1/Users";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import { ProtectedRoute } from "./ProtectedRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonPage />,
    children: [
      { index: true, element: <Product /> },
      { path: 'product/:id', element: <ProductComponent /> },
      {
        path: 'profile/:id',
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: 'users',
        element: <ProtectedRoute><Users /></ProtectedRoute>
        // element: <PrivateRoute><Users /></PrivateRoute>
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/order_history/:id',
        element: <Orders />
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);
