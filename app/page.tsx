"use client";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/providers/SocketProvider";
export default function Home() {
  const { socket } = useSocket();
  const test = () => {
    if(!socket) return ;
    socket.emit("donor", "I have food to donate");
  };
  return (
    <Button variant={"default"} size={"lg"} onClick={test}>Donor</Button>
  );
}
