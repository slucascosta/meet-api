import { Server } from "socket.io";

export default class Socket {
  #app;
  #io;
  #server;
  #activeSockets = [];
  #events = [];

  constructor(httpServer) {
    this.#app = httpServer;
    this.#server = this.#app.getHttpServer();
    this.#io = new Server(this.#server, { cors: {
      origin: '*',
    }});
  }

  init() {
    this.#io.on("connection", s => this.#connect(s));
  }

  on(event, callback) {
    this.#events.push({
      event,
      callback
    });
  }

  emit(event, message, socket) {
    (socket || this.#io).emit(event, message);
  }

  #connect(socket) {
    console.log(`Socket connected: ${socket.id}`);

    this.#onDisconnect(socket);

    this.#storeSocket(socket);
    this.#sendListToSocket(socket);
    this.#sendList(socket);
    this.#bindEvents(socket);
  }

  #storeSocket(socket) {
    this.#activeSockets.push(socket.id);
  }

  #sendListToSocket(socket) {
    this.emit("update-user-list", {
      users: this.#activeSockets.filter(x => x !== socket.id)
    }, socket);
  }

  #sendList(socket) {
    this.emit("update-user-list", {
      users: [socket.id]
    }, socket.broadcast);
  }

  #onDisconnect(socket) {
    socket.on("disconnect", () => {
      const index = this.#activeSockets.indexOf(socket.id);
      this.#activeSockets.splice(index, 1);
      
      this.#removeUser(socket.id);

      console.log(`Socket disconnected: ${socket.id}`);
    });
  }

  #removeUser(id) {
    this.emit("remove-user", { socketId: id });
  }

  #bindEvents(socket) {
    this.#events.forEach(x =>
      socket.on(x.event, (...args) => x.callback(socket, ...args)));
  }
}