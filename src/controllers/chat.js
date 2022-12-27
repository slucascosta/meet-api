const rooms = [];
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default class ChatController {
  #httpServer;

  constructor(httpServer) {
    this.#httpServer = httpServer
    this.#init();
  }

  #init() {
    this.#httpServer.on("post", "/room/create", (...args) => this.#createRoom(...args));
  }

  #createRoom(params, body) {
    const roomId = this.generateString(12);
    rooms.push({ roomId });

    return { roomId };
  }

  generateString(length) {
    let result = "";
    const possibilities = characters.length;

    for (let i = 0; i < length; i++)
      result += characters.charAt(Math.floor(Math.random() * possibilities));

    return result;
  }
}