import { AuthProvider } from "./Context/Auth/AuthContext";
import { ChatProvider } from "./Context/Chat/ChatContext";
import { SocketProvider } from "./Context/Sockets/SocketContext";
import { AppRouter } from "./router/AppRouter";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const ChatApp = () => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
};
