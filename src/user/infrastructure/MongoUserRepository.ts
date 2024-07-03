import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserModel } from "./UserSchema";

export class MongoUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const users = await UserModel.find();
    return users.map((user) => new User(user.id, user.name, user.age));
  }

  async getById(userId: string): Promise<User | null> {
    const user = await UserModel.findById(userId);
    if (!user) {
      return null;
    }
    return new User(user.id, user.name, user.age);
  }

  async createUser(user: User): Promise<User> {
    const newUser = new UserModel({
      name: user.name,
      age: user.age,
    });
    const savedUser = await newUser.save();
    return new User(savedUser.id, savedUser.name, savedUser.age);
  }

  async updateUser(userId: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, user, {
      new: true,
    });
    if (!updatedUser) {
      return null;
    }
    return new User(updatedUser.id, updatedUser.name, updatedUser.age);
  }

  async deleteUser(userId: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(userId);
    return result !== null;
  }
}

export default MongoUserRepository;
