import { Publicity } from "../Publicity";

export interface PublicityRepository {
  getAll(): Promise<Publicity[]>;
  getById(id: string): Promise<Publicity | null>;
  createPublicity(publicity: Publicity): Promise<Publicity>;
  updatePublicity(
    id: string,
    publicity: Partial<Publicity>
  ): Promise<Publicity | null>;
  deletePublicity(id: string): Promise<boolean>;
}
