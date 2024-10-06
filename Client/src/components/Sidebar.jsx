import { useContext } from "react";
import { ChatContext } from "../Context/Chat/ChatContext";
import { SidebarChatItem } from "./SidebarChatItem";
import { AuthContext } from "../Context/Auth/AuthContext";

export const Sidebar = () => {
  // Uso mi context para extraer la lista de usuarios
  const { chatState } = useContext(ChatContext);
  // console.log(chatState);

  // Hago uso de mi context del auth
  const { auth } = useContext(AuthContext);
  // console.log(auth);

  return (
    <div className="inbox_chat">
      {/* Recorremos los usuarios */}
      {/* Filtrando el usuario que sea igual a nuestro usuario logeado */}
      {chatState.usuarios
        .filter((usuario) => usuario._id !== auth.id)
        .map((usuario) => (
          <SidebarChatItem key={usuario._id} usuario={usuario} />
        ))}

      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  );
};
