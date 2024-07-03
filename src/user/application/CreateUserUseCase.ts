import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userPayload: Omit<User, "id">): Promise<User> {
    const user = new User(null, userPayload.name, userPayload.age);

    return this.userRepository.createUser(user);
  }
}

export default CreateUserUseCase;
