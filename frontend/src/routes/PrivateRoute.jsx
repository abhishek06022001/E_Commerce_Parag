import { Children, useEffect, useState } from "react";
import useLoggedIn from "../customHook/useLoggedIn";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const [isValid, loading] = useLoggedIn();
  return (<>
    {loading ?
      <div className="h-screen flex justify-center items-center" ><div class="spinner-3"></div></div>
      : (isValid ? children : <Navigate to="/login" />)}
  </>)

};
