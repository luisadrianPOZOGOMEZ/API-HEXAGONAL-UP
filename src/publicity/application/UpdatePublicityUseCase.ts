import { PublicityRepository } from "../domain/ports/PublicityRepository";
import { Publicity } from "../domain/Publicity";

class UpdatePublicityUseCase {
  constructor(private publicityRepository: PublicityRepository) {}

  async execute(
    publicityId: string,
    publicityPayload: Partial<Publicity>
  ): Promise<Publicity> {
    const result = await this.publicityRepository.updatePublicity(
      publicityId,
      publicityPayload
    );

    if (!result) {
      throw new Error(
        `El id ${publicityId} de la publicidad no fue encontrada`
      );
    }
    return result;
  }
}

export default UpdatePublicityUseCase;
