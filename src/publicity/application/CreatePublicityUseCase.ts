import { PublicityRepository } from "../domain/ports/PublicityRepository";
import { Publicity } from "../domain/Publicity";

class CreatePublicityUserCase {
  constructor(private publicityRepository: PublicityRepository) {}

  async execute(userPayload: Omit<Publicity, "id">): Promise<Publicity> {
    const publicity = new Publicity(
      null,
      userPayload.description,
      userPayload.image,
      userPayload.image_s3
    );
    return this.publicityRepository.createPublicity(publicity);
  }
}

export default CreatePublicityUserCase;
