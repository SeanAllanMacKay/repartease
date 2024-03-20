import { createContext, useEffect, useState, useContext } from "react";

import { UserContext } from "./UserContext";

import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user) {
      setSocket(
        io?.(process.env.NEXT_PUBLIC_API_URL, { query: { userId: user._id } })
      );
    }

    return () => {
      if (socket) {
        socket?.disconnect();

        setSocket(null);
      }
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
