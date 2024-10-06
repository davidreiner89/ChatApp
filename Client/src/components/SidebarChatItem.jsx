import { useContext } from "react";
import { ChatContext } from "../Context/Chat/ChatContext";
import { types } from "../types";
import { fetchConToken } from "../Helper/fetch";
import { scrollToBottomWithOutAnimated } from "../Helper/Scroll";

export const SidebarChatItem = ({ usuario }) => {
  const { _id, nombre, online } = usuario;

  // Extraigo el dispatch de mi contexto
  const { dispatch, chatState } = useContext(ChatContext);

  // Funcion para activar un chat
  const handleActivarChat = async () => {
    // console.log("Mandar mensaje a ", _id);
    dispatch({ type: types.chatActivo, payload: _id });

    // Cargar los mensajes
    const response = await fetchConToken(`mensajes/${_id}`);
    console.log(response);
    dispatch({ type: types.cargarMensajes, payload: response.message });

    // Scroll animated
    setTimeout(() => scrollToBottomWithOutAnimated("historialMensajes"));
  };

  return (
    <div
      className={`chat_list ${
        chatState.chatActivo === _id ? "active_chat" : ""
      }`}
      onClick={handleActivarChat}
    >
      {/* active_chat */}
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{nombre}</h5>
          {online ? (
            <span className="text-success text-green-300">Online</span>
          ) : (
            <span className="text-danger text-red-300">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
