import { User } from "./User";

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(userId: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  updateUser(userId: string, user: Partial<User>): Promise<User | null>;
  deleteUser(userId: string): Promise<boolean>;
}
