import { Request, Response } from "express";

import UpdateUserUseCase from "../../application/UpdateUserUseCase";

class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await this.updateUserUseCase.axecute(id, req.body);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default UpdateUserController;
