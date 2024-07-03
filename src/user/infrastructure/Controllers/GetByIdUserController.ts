import { Request, Response } from "express";

import { GetByIdUserUseCase } from "../../application/GetByIdUserUseCase";

class GetByIdUserController {
  constructor(private getByIdUserUseCase: GetByIdUserUseCase) {}

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await this.getByIdUserUseCase.run(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default GetByIdUserController;
