"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = getSocket();
    socketInstance.connect();

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket");
      const userId = localStorage.getItem("donor_id");
      if (userId) {
        socketInstance.emit("donor_connected", userId);
        console.log("Emitted donor_connected", userId);
      }
    });

    socketInstance.on("meal_booked", (data) => {
      console.log(data);
      alert(data.message);
    });

    socketInstance.on("meal_expired", (data) => {
      console.log(data);
      alert(data.message);
    });

    socketInstance.on("meal_received", (data) => {
      console.log(data);
      alert(data.message);
    });

    socketInstance.on("meal_reservation_cancelled_by_collector", (data) => {
      console.log(data);
      alert(data.message);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
