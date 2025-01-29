import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
    if (user && role === "admin") {
      
    return <Outlet />;
  } else {
    return <Navigate to="/auth" />;
  }
}

export default AdminRoute
