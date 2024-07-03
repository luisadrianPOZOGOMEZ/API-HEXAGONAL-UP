import { PublicityRepository } from "../domain/ports/PublicityRepository";

class GetByIdPublicityUseCase {
  constructor(private readonly publcityRepository: PublicityRepository) {}

  async run(publicityId: string) {
    const publicity = await this.publcityRepository.getById(publicityId);

    if (!publicity) {
      throw new Error(
        `El id: ${publicityId} de la publicidad no fue encontrada`
      );
    }
    console.log(publicity);

    return publicity;
  }
}

export default GetByIdPublicityUseCase;
