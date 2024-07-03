import CreatePublicityUserCase from "../application/CreatePublicityUseCase";
import DeletePublicityUseCase from "../application/DeletePublicityUseCase";
import GetAllPublicityUseCase from "../application/GetAllPublicityUseCase";
import GetByIdPublicityUseCase from "../application/GetByIdPublicityUseCase";
import UpdatePublicityUseCase from "../application/UpdatePublicityUseCase";
import { Factory } from "./adapters/repositories/Factory";
import PublicityController from "./Controllers/PublicityController";

const publicityRepository = Factory.createPublicityRepository();

export const getAllPublicityUseCase = new GetAllPublicityUseCase(
  publicityRepository
);

export const createPublicityUserCase = new CreatePublicityUserCase(
  publicityRepository
);

export const getByIdPublicityUseCase = new GetByIdPublicityUseCase(
  publicityRepository
);

export const updatePublicityUseCase = new UpdatePublicityUseCase(
  publicityRepository
);

export const deletePublicityUseCase = new DeletePublicityUseCase(
  publicityRepository
);

export const publicityController = new PublicityController(
  getAllPublicityUseCase,
  createPublicityUserCase,
  getByIdPublicityUseCase,
  updatePublicityUseCase,
  deletePublicityUseCase
);
