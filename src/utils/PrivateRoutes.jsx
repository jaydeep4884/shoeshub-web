import { Outlet, Navigate } from "react-router";

const PrivateRoutes = () => {
  let auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoutes;
