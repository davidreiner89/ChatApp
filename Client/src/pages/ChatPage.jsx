import { useContext } from "react";
import { ChatSelect } from "../components/ChatSelect";
import { InboxPeople } from "../components/InboxPeople";
import { Messages } from "../components/Messages";
import { ChatContext } from "../Context/Chat/ChatContext";

import "../css/chat.css";

export const ChatPage = () => {
  // Extraigo el chatState de mi contexto
  const { chatState } = useContext(ChatContext);
  // console.log(chatState);

  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />
        {chatState.chatActivo ? <Messages /> : <ChatSelect />}
      </div>
    </div>
  );
};
