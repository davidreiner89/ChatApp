import { createContext, useCallback, useContext, useState } from "react";
import { fetchConToken, fetchSinToken } from "../../Helper/fetch";
import { toast } from "sonner";
import { ChatContext } from "../Chat/ChatContext";
import { types } from "../../types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado para el inicio de sesion
  const [auth, setAuth] = useState({
    id: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
  });

  // Response fetch token
  const [reponseToken, setResponseToken] = useState(false);

  // Extraigo el dispatch de mi contexto
  const { dispatch } = useContext(ChatContext);

  // Funcion del login
  const Login = async (email, password) => {
    // Hago la peticion
    const response = await fetchSinToken("login", { email, password }, "POST");

    // Guardamos el token en el storage
    if (response.ok) {
      localStorage.setItem("token", response.token);

      toast.success("Inicio de Sesión exitoso");

      // Cambiamos los estados de nuestro auth
      setAuth({
        id: response.id,
        checking: false,
        logged: true,
        name: response.nombre,
        email: response.email,
      });

      setResponseToken(true);
    } else {
      toast.warning(response.message);

      setResponseToken(false);
    }

    return response;
  };

  // Funcion del register
  const Register = async (nombre, email, password) => {
    // Peticion
    const response = await fetchSinToken(
      "login/new",
      { nombre, email, password },
      "POST"
    );

    if (response.ok) {
      toast.success("Registro exitoso");

      localStorage.setItem("token", response.token);

      setAuth({
        id: response.id,
        checking: false,
        logged: true,
        name: response.nombre,
        email: response.email,
      });

      setResponseToken(true);
    } else {
      setResponseToken(false);
      toast.error(response.message);
    }

    return response;
  };

  const verificaToken = useCallback(async () => {
    // Verificamos el token
    const token = localStorage.getItem("token");

    // Si no hay token
    if (!token) {
      setAuth({ id: null, checking: false, logged: false });
      return setResponseToken(false);
    }

    // Si hay token
    const response = await fetchConToken("login/renew");

    // ok en true
    if (response.ok) {
      localStorage.setItem("token", response.token);

      setAuth({
        id: response.id,
        checking: false,
        logged: true,
        name: response.nombre,
        email: response.email,
      });

      // console.log("Token verificado");

      return setResponseToken(true);
    } else {
      setAuth({ id: null, checking: false, logged: false });
      return setResponseToken(false);
    }
  }, []);

  // Funcion para el logout
  const LogOut = () => {
    // Remove token
    localStorage.removeItem("token");

    // Reinicio los valores del auth
    setAuth({
      checking: false,
      logged: false,
    });

    // Limpio los valores del chat context
    dispatch({
      type: types.resetValues,
    });

    // Seteo el response token
    setResponseToken(false);
  };

  return (
    <AuthContext.Provider
      value={{ auth, Login, Register, verificaToken, reponseToken, LogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
