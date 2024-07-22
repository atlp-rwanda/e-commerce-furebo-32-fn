import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedAdmin: React.FC<ProtectedRouteProps> = ({ children }) => {
  const role = localStorage.getItem("role");

  if (role!=="admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdmin;
