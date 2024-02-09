import { ReadCookie } from "../hooks/ReactCookie";

const token = ReadCookie("Authorization");
export const socket = new WebSocket(
  `ws://localhost:3000/chat/ws/public?authorization=${token}`
);

export const sendMessage = (type: string, content: any) => {
  let newMessageRequest = {
    type: type,
    unix: Date.now(),
    content: JSON.stringify(content),
  };
  socket.send(JSON.stringify(newMessageRequest));
};
