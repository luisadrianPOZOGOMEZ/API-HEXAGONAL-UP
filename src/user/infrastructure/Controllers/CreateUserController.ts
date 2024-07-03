import { Request, Response } from "express";

import CreateUserUseCase from "../../application/CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default CreateUserController;
