import { UserRepository } from "../domain/UserRepository";

export class GetByIdUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(userId: string) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new Error(`el Id: ${userId} del usuario no se encontro`);
    }
    console.log(user);

    return this.userRepository.getById(userId);
  }
}
