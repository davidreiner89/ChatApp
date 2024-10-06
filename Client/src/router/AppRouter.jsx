import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";

// Context
import { AuthContext } from "../Context/Auth/AuthContext";
// Public Routes
import { PublicRoutes } from "./Public.Routes";
// Auth
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
// Protected Routes
import { ProtectedRoutes } from "./Protected.Routes";
// Dashboard
import { ChatPage } from "../pages/ChatPage";
// Loading
import { Loader } from "../components/Loader";

import "../css/login-register.css";

export const AppRouter = () => {
  const { auth, verificaToken, reponseToken } = useContext(AuthContext);
  // console.log(auth);

  useEffect(() => {
    verificaToken();
  }, [reponseToken, verificaToken]);

  if (auth.checking) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
