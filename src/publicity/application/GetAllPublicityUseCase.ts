import { PublicityRepository } from "../domain/ports/PublicityRepository";
import { Publicity } from "../domain/Publicity";

class GetAllPublicityUseCase {
  constructor(private publicityRepository: PublicityRepository) {}

  async execute(): Promise<Publicity[]> {
    return this.publicityRepository.getAll();
  }
}

export default GetAllPublicityUseCase;
