import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import TestPage from "../pages/TestPage";
import Signup from "../pages/Signup";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <TestPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);
