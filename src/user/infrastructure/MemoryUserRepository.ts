import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { data } from "./memoria";

export class MemoryUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const users = data;
    return users.map((row: any) => new User(row.id, row.name, row.age));
  }

  async createUser(user: User): Promise<User> {
    const newId = data.length ? data[data.length - 1].id + 1 : 1;
    const newUser = {
      id: newId,
      name: user.name,
      age: user.age,
    };

    data.push(newUser);

    return new User(newUser.id, newUser.name, newUser.age);
  }

  async getById(id: number): Promise<User | null> {
    const user = data.find((u) => u.id === id);

    if (!user) {
      return null; // cuando no se encontró ningún usuario con el ID
    }

    return new User(user.id, user.name, user.age);
  }

  async updateUser(user: User): Promise<User | null> {
    const id = user.id;
    const userIndex = data.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return null;
    }

    const existingUser = data[userIndex];
    const updatedUser = {
      ...existingUser,
      ...user,
      id: existingUser.id, // Aseguramos que el ID no se actualice
    };

    data[userIndex] = updatedUser;

    return new User(updatedUser.id, updatedUser.name, updatedUser.age);
  }

  async deleteUser(id: number): Promise<boolean> {
    const index = data.findIndex((u) => u.id === id);

    if (index === -1) {
      return false; // cuando no se encontró ningún usuario con el ID
    }

    data.splice(index, 1);

    return true;
  }
}
