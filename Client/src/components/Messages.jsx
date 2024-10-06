import { useContext } from "react";
import { IncomingMessage } from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { SendMessage } from "./SendMessage";
import { ChatContext } from "../Context/Chat/ChatContext";
import { AuthContext } from "../Context/Auth/AuthContext";

export const Messages = () => {
  // Extraigo el arreglo de mensajes de mi contexto
  const { chatState } = useContext(ChatContext);
  const { mensajes } = chatState;
  // console.log(mensajes);

  // Extraigo el id id del usuario de mi contexto
  const { auth } = useContext(AuthContext);
  const { id } = auth;

  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}
      <div id="historialMensajes" className="msg_history">
        {mensajes.map((msg) =>
          msg.para === id ? (
            <IncomingMessage
              txt={msg.mensaje}
              date={msg.createdAt}
              key={msg._id}
            />
          ) : (
            <OutgoingMessage
              date={msg.createdAt}
              txt={msg.mensaje}
              key={msg._id}
            />
          )
        )}
      </div>
      {/* <!-- Historia Fin --> */}

      <SendMessage />
    </div>
  );
};
