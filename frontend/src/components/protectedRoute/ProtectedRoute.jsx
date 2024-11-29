import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const ProtectedRoute = ({ children, admin }) => {
  const { authenticated, user } = useContext(AuthContext);
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
