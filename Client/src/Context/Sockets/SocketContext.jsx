import { createContext, useContext, useEffect } from "react";
import { useSocket } from "../../Hooks/useSocket";
import { AuthContext } from "../Auth/AuthContext";
import { ChatContext } from "../Chat/ChatContext";
import { types } from "../../types";
import { scrollToBottomWithAnimated } from "../../Helper/Scroll";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  // Context Socket
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    "http://localhost:8080"
  );
  // Context Auth
  const { reponseToken } = useContext(AuthContext);
  // Context chat
  const { dispatch } = useContext(ChatContext);

  // Si se conecta un cliente
  useEffect(() => {
    if (reponseToken) {
      conectarSocket();
      // console.log("cliente conectado");
      return;
    }
  }, [reponseToken, conectarSocket]);

  // Si se desconecta un cliente
  useEffect(() => {
    if (!reponseToken) {
      desconectarSocket();
      // console.log("cliente desconectado");
      return;
    }
  }, [reponseToken, desconectarSocket]);

  // Escuchamos los usuarios conectados que emite el socket
  useEffect(() => {
    socket?.on("usuarios-conectados", (users) => {
      // console.log(users);
      dispatch({ type: types.usuariosCargados, payload: users });
    });
  }, [socket, dispatch]);

  // Escuchamos los mensajes personales
  useEffect(() => {
    socket?.on("mensaje-personal", (message) => {
      // console.log(message);
      dispatch({ type: types.mensajesChatActivo, payload: message });

      // Scroll animated
      setTimeout(() => scrollToBottomWithAnimated("historialMensajes"));
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
