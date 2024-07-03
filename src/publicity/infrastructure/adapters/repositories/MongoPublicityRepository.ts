import { PublicityRepository } from "../../../domain/ports/PublicityRepository";
import { Publicity } from "../../../domain/Publicity";
import { PublicityModel } from "../../PublicitySchema";

export class MongoPublicityRepository implements PublicityRepository {
  async getAll(): Promise<Publicity[]> {
    const publicity = await PublicityModel.find();
    return publicity.map(
      (pub) => new Publicity(pub.id, pub.description, pub.image, pub.image_s3)
    );
  }

  async getById(id: string): Promise<Publicity | null> {
    const publicity = await PublicityModel.findById(id);
    return publicity
      ? new Publicity(
          publicity.id,
          publicity.description,
          publicity.image,
          publicity.image_s3
        )
      : null;
  }

  async createPublicity(publicity: Publicity): Promise<Publicity> {
    const newPublicity = new PublicityModel(publicity);
    const savedPublicity = await newPublicity.save();
    return new Publicity(
      savedPublicity.id,
      savedPublicity.description,
      savedPublicity.image,
      savedPublicity.image_s3
    );
  }

  async updatePublicity(
    id: string,
    publicity: Partial<Publicity>
  ): Promise<Publicity | null> {
    const updatePublicity = await PublicityModel.findByIdAndUpdate(
      id,
      publicity,
      { new: true }
    );
    return updatePublicity
      ? new Publicity(
          updatePublicity.id,
          updatePublicity.description,
          updatePublicity.image,
          updatePublicity.image_s3
        )
      : null;
  }

  async deletePublicity(id: string): Promise<boolean> {
    const result = await PublicityModel.findByIdAndDelete(id);
    return result !== null;
  }
}
