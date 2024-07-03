import express from "express";

import { upload } from "../adapters/storages/LocalFileStorage";
import { publicityController } from "../dependencies";

const publicityRouter = express.Router();

publicityRouter.get(
  "/getAll",
  publicityController.getAll.bind(publicityController)
);
publicityRouter.post(
  "/create",
  upload.single("image"),
  publicityController.create.bind(publicityController)
);
publicityRouter.get(
  "/:id",
  publicityController.getById.bind(publicityController)
);
publicityRouter.put(
  "/:id",
  upload.single("image"),
  publicityController.update.bind(publicityController)
);
publicityRouter.delete(
  "/:id",
  publicityController.delete.bind(publicityController)
);

export { publicityRouter };
