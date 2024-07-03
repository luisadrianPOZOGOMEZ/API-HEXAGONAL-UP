import { Request, Response } from "express";

import GetAllUserUseCase from "../../application/GetAllUserUseCase";

class GetAllUserController {
  constructor(private getAllUserUseCase: GetAllUserUseCase) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.getAllUserUseCase.execute();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default GetAllUserController;
