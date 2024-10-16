import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ErrorPage from "../pages/ErrorPage";
import CommonPage from "../pages/CommonPage";
import Product from "../pages/user_0/Product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonPage />,
    children: [
      { index: true, element: <Product/> }
    ]

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
