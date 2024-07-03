import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import express from "express";

import { config } from "./Config";
import { publicityRouter } from "./publicity/infrastructure/routes/PublicityRouter";
import { userRouter } from "./user/infrastructure/UserRouter";

function boostrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/users", userRouter);
  app.use("/publicaties", publicityRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
