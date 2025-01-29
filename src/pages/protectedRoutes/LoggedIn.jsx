import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const LoggedIn = () => {
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role");
   
  if (user && role === 'vendor') {
      
      return <Outlet />;
  } else {
  
      return <Navigate to="/auth" />;
    }
}

export default LoggedIn
