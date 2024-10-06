import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  // Estado del Socket
  const [socket, setSocket] = useState(null);
  // Estado del online
  const [online, setOnline] = useState(false);

  // Connect Socket
  const conectarSocket = useCallback(() => {
    // Token storage
    const token = localStorage.getItem("token");

    const socketTemporal = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      // Envio el token a traves del socket
      query: {
        "token-storage": token,
      },
    });

    setSocket(socketTemporal);
  }, [serverPath]);

  // Disconnect socket
  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => setOnline(false));
  }, [socket]);

  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket,
  };
};
