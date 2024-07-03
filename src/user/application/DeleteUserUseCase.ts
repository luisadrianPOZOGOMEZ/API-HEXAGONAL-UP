import { UserRepository } from "../domain/UserRepository";

class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<boolean> {
    const result = await this.userRepository.deleteUser(userId);

    if (!result) {
      throw new Error(`No se pudo eliminar a el usuario con el Id ${userId}`);
    }

    console.log(`El usuario: ${userId} se ha eliminado con exito`);
    return result;
  }
}

export default DeleteUserUseCase;
