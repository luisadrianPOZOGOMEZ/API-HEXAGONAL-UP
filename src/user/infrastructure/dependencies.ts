import CreateUserUseCase from "../application/CreateUserUseCase";
import DeleteUserUseCase from "../application/DeleteUserUseCase";
import GetAllUserUseCase from "../application/GetAllUserUseCase";
import { GetByIdUserUseCase } from "../application/GetByIdUserUseCase";
import UpdateUserUseCase from "../application/UpdateUserUseCase";
import CreateUserController from "./Controllers/CreateUserController";
import DeleteUserController from "./Controllers/DeleteUserController";
import GetAllUserController from "./Controllers/GetAllUserController";
import GetByIdUserController from "./Controllers/GetByIdUserController";
import UpdateUserController from "./Controllers/UpdateUserController";
import { Factory } from "./Factory";

const userFactoryRepository = Factory.creteUserRepository(); // Esta implemeta el userRepository que necesita el caso de uso

export const getAllUserUserCase = new GetAllUserUseCase(userFactoryRepository);

export const createUserUseCase = new CreateUserUseCase(userFactoryRepository);

export const getById = new GetByIdUserUseCase(userFactoryRepository);

export const updateUser = new UpdateUserUseCase(userFactoryRepository);

export const deleteUser = new DeleteUserUseCase(userFactoryRepository);

export const createUserController = new CreateUserController(createUserUseCase);
export const deleteUserController = new DeleteUserController(deleteUser);
export const getAllUserController = new GetAllUserController(
  getAllUserUserCase
);
export const getByIdUserController = new GetByIdUserController(getById);
export const updateUserController = new UpdateUserController(updateUser);
