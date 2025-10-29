import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) return <Navigate to="/login" />;

  return children;
};

export default ProtectedPage;
