import ChatController from "./chat.js";

export default function (httpServer) {
  new ChatController(httpServer);
};