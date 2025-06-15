"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { Socket } from "socket.io-client";
import {
  handleMealBooked,
  handleMealReservationCancelledByCollector,
  handleMealExpired,
  handleMealReceived,
} from "@Events";
import { useNotifications } from "./notification_provider";
import { useQueryClient } from "@tanstack/react-query";

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
  const { addNotification, setHasUnseenNotifications } = useNotifications();
  const queryClient = useQueryClient();
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
      const notification = handleMealBooked(data, queryClient);
      addNotification(notification);
      setHasUnseenNotifications(true);
    });

    socketInstance.on("meal_expired", (data) => {
      const notification = handleMealExpired(data, queryClient);
      addNotification(notification);
      setHasUnseenNotifications(true);
    });

    socketInstance.on("meal_received", (data) => {
      const notification = handleMealReceived(data, queryClient);
      addNotification(notification);
      setHasUnseenNotifications(true);
    });

    socketInstance.on("meal_reservation_cancelled_by_collector", (data) => {
      const notification = handleMealReservationCancelledByCollector(
        data,
        queryClient
      );
      addNotification(notification);
      setHasUnseenNotifications(true);
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
