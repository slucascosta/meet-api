import ChatController from "./chat.js";
import HelloController from "./hello.js";

export default function (httpServer) {
  new HelloController(httpServer);
  new ChatController(httpServer);
};