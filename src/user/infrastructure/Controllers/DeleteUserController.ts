import { Request, Response } from "express";

import DeleteUserUseCase from "../../application/DeleteUserUseCase";

class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteUserUseCase.execute(id);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default DeleteUserController;
