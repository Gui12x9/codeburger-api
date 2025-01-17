import express from "express";
import routes from "./routes";
import { resolve } from "path";
import cors from "cors";
import "./database";

const corsOptions = {
  origin: 'https://codeburger-interface-chi.vercel.app',
  credentials: true,
}

class App {
  constructor() {
    this.app = express();
    this.app.use(cors(corsOptions));
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'https://codeburger-interface-chi.vercel.app');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    });
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(
      "/product-file",
      express.static(resolve(__dirname, "..", "uploads"))
    );
    this.app.use(
      "/category-file",
      express.static(resolve(__dirname, "..", "uploads"))
    );
  }
  routes() {
    this.app.use(routes);
  }
}

export default new App().app;