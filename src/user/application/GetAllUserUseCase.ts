import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

class GetAllUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}

export default GetAllUserUseCase;
