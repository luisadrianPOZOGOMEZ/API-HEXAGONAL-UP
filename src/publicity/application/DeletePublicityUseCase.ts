import { PublicityRepository } from "../domain/ports/PublicityRepository";

class DeletePublicityUseCase {
  constructor(private publicityRepository: PublicityRepository) {}
  async execute(publicityId: string): Promise<boolean> {
    const result = await this.publicityRepository.deletePublicity(publicityId);

    if (!result) {
      throw new Error(
        `La publicidad no se pudo eliminar con el id: ${publicityId}`
      );
    }

    console.log(
      `La publicidad con el id: ${publicityId} se elimino exitosamente`
    );
    return result;
  }
}

export default DeletePublicityUseCase;
