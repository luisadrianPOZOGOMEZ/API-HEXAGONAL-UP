import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async axecute(userId: string, userPayload: Partial<User>): Promise<User> {
    const result = await this.userRepository.updateUser(userId, userPayload);

    if (!result) {
      throw new Error(`El Id: ${userId} del usuario no se encontro`);
    }

    return result;
  }
}

export default UpdateUserUseCase;
