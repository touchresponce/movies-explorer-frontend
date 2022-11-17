import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  return localStorage.getItem("jwt") ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoutes;
