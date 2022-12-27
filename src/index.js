import ExpressAdapter from "./infra/api/expressAdapter.js"
import Socket from "./infra/api/socket.js"
import { API_PORT } from "./infra/config/settings.js"
import services from "./services/index.js"
import controllers from "./controllers/index.js"

const httpServer = new ExpressAdapter()

const socket = new Socket(httpServer)
socket.init()

services(socket)
controllers(httpServer);

httpServer.listen(API_PORT);