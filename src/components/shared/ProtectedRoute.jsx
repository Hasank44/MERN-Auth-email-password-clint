import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/user/login" replace />;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
    const { user } = useSelector((store) => store.user);
  if (user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
