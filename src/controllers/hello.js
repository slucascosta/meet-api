export default class HelloController {
  #httpServer;

  constructor(httpServer) {
    this.#httpServer = httpServer
    this.#init();
  }

  #init() {
    this.#httpServer.on("post", "*", (...args) => this.#hello(...args));
  }

  #hello(params, body) {
    return { message: "Hello world" };
  }
}