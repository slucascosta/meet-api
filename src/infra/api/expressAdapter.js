import express from "express";
import cors from "cors";
import { createServer } from "https";
import fs from "fs";
import { fullPath } from "../helper.js";
import { APP_URL } from "../config/settings.js";

export default class ExpressAdapter {
  app;
  server;

  constructor() {
    this.app = express();

    const options = {
      key: fs.readFileSync(fullPath(import.meta.url, "../security/cert.key")),
      cert: fs.readFileSync(fullPath(import.meta.url, "../security/cert.pem"))
    };
    this.server = createServer(options, this.app);

    this.init();
  }

  init() {
    this.app.use(cors({
      origin: APP_URL,
      methods: ['GET','POST']
    }));
    this.app.use(express.json());
  }

  on(method, url, callback) {
    this.app[method](url, async function (req, res) {
      console.log(`${method} - ${url}`);
      const output = await callback(req.params, req.body);
      res.json(output);
    })
  }

  listen(port) {
    this.server.listen(port, () => {
      console.log(`App listenig on port ${port}`);
    });
  }

  getHttpServer() {
    return this.server;
  }
}