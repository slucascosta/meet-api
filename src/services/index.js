import Chat from "./chat/index.js";

const services = {};

export default function (socket) {
  services.chatService = new Chat({ ...services, socket });
}