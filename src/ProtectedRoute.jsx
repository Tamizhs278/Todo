import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const isAuthenticated = localStorage.getItem("user"); 
  
  return isAuthenticated == `"zghshsuhjsbjdgjhksjkshkj"`? children : <Navigate to="/" />;
};

export default ProtectedRoute;
