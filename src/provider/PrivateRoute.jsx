// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
