import { createContext, useReducer } from "react";
import { chatReducer } from "./chatReducer";

// Estados iniciales del contexto
const initialState = {
  idUser: null, // Usuario logeado
  chatActivo: null, // Usuario al que se le envia el mensaje
  usuarios: [], // Todos los usuarios
  mensajes: [], // Mensajes del chat seleccionado
};

// Creamos el contexto de los chats
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // El useReducer nos ayuda a manejar estados mas complejos de una manera mas simple (a traves de switchs, tambien se puede usar el useState)
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider
      value={{
        chatState,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
