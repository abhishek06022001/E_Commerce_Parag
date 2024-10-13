import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  }
]);
