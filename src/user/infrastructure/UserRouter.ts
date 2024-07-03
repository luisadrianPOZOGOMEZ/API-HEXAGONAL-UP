import express from "express";

import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getByIdUserController,
  updateUserController,
} from "./dependencies";

export const userRouter = express.Router();

userRouter.get(
  "/getAll",
  getAllUserController.getAll.bind(getAllUserController)
);
userRouter.get(
  "/:id",
  getByIdUserController.getById.bind(getByIdUserController)
);
userRouter.post(
  "/create",
  createUserController.createUser.bind(createUserController)
);
userRouter.put(
  "/:id",
  updateUserController.updateUser.bind(updateUserController)
);
userRouter.delete(
  "/:id",
  deleteUserController.deleteUser.bind(deleteUserController)
);
