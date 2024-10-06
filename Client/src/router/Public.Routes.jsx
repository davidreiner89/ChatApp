import { useContext } from "react";
import { AuthContext } from "../Context/Auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
  const { auth } = useContext(AuthContext);

  // Si esta autenticado
  if (auth.logged) return <Navigate to="/" replace />;

  // Si no esta autenticado
  return <Outlet />;
};
