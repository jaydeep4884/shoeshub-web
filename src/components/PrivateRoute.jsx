// components/PrivateRoute.js
import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../assets/contexts";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Link to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
