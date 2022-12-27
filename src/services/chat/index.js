export default class Chat { 
  io;

  constructor({ socket }) {
    this.io = socket;

    this.init();
  }

  init() {
    this.io.on("call-user", (...args) => this.callUser(...args));
    this.io.on("make-answer", (...args) => this.makeAnswer(...args));
  }

  callUser(socket, { to, offer }) {
    socket.to(to).emit("call-made", {
      offer,
      socket: socket.id
    });
  }

  makeAnswer(socket, { to, answer }) {
    socket.to(to).emit("answer-made", {
      socket: socket.id,
      answer
    })
  }
}