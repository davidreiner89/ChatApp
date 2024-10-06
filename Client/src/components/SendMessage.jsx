import { useContext, useState } from "react";
import { SocketContext } from "../Context/Sockets/SocketContext";
import { ChatContext } from "../Context/Chat/ChatContext";
import { AuthContext } from "../Context/Auth/AuthContext";

export const SendMessage = () => {
  const [message, setMessage] = useState("");

  // Uso el socket de mi context
  const { socket } = useContext(SocketContext);

  // Uso el id del usuario al que le quiero enviar el mensaje de mi contexto
  const { chatState } = useContext(ChatContext);
  const { chatActivo } = chatState;

  // Uso el id del usuario logeado de mi contexto
  const { auth } = useContext(AuthContext);
  const { id } = auth;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.length === 0) {
      return;
    }

    // console.log("Enviar :", message);

    setMessage("");

    // Evento de socket para enviar mensaje
    socket.emit("mensaje-personal", {
      de: id,
      para: chatActivo,
      mensaje: message,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="type_msg flex flex-row">
        <div className="input_msg_write col-sm-9 w-[90%]">
          <input
            value={message}
            onChange={({ target }) => setMessage(target.value)}
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
