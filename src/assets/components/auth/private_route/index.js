import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute () {
  return localStorage.getItem('user') ? <Outlet /> : <Navigate to="/login" />
};

export default PrivateRoute;