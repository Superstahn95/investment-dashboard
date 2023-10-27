import React from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated }) => {
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Route element={element} />;
  } else {
    // Redirect to the login page
    navigate("/login");
    return null; // Return null to avoid rendering anything
  }
};

export default PrivateRoute;
