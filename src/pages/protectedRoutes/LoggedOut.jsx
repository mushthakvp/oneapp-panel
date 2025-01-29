import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../utils/settingCookie";

const LoggedOut = () => {
  // Retrieve token and role from localStorage
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If user is logged in as 'vendor', redirect to home
  if (user && role === "vendor") {
    return <Navigate to="/" />;
  }
  if (user && role === "admin") {
    // const token = getCookie("token");
    // if (!token) {
    //   localStorage.clear();
    //   window.location.href = "/auth";
    //   return null; // Ensure no further rendering occurs
    // }

    return <Navigate to="/admin" />;
  }

  // If the user is neither a vendor nor an admin (or is not logged in), render the default Outlet
  return <Outlet />;
};

export default LoggedOut;
