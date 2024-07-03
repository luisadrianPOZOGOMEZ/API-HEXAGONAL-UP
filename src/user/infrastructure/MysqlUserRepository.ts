import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { query } from "./MySql";

export class MysqlUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const sql = "SELECT * FROM users";
    const rows = (await query(sql, [])) as any[];
    console.log("=>", rows);

    return rows.map((row: any) => new User(row.id, row.name, row.age));
  }

  async createUser(user: User): Promise<User> {
    const sql = "INSERT INTO users (name, age) VALUES (?, ?)";
    const params = [user.name, user.age];
    try {
      const result: any = await query(sql, params);
      return new User(result.insertId, user.name, user.age);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Could not create user");
    }
  }

  async getById(id: string): Promise<User | null> {
    const sql = "SELECT * FROM users WHERE id = ?";
    const params = [id];
    const rows = (await query(sql, params)) as any[];

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    const user = new User(row.id, row.name, row.age);
    console.log(user);

    return user;
  }

  async updateUser(
    userId: string,
    newUser: Partial<User>
  ): Promise<User | null> {
    const sql = "UPDATE users SET name=?, age=? WHERE id = ?";
    const params = [newUser.name, newUser.age, userId];
    const result: any = await query(sql, params);

    if ((result.affectedRows = 0)) {
      return null;
    }

    return await this.getById(userId);
  }

  async deleteUser(id: string): Promise<boolean> {
    const sql = "DELETE FROM users WHERE id = ?";
    const params = [id];
    try {
      const result: any = await query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al borrar al usuario con el ID ${id}:`, error);
      throw new Error(`No se puso borrar al usuario con el ID ${id}`);
    }
  }
}
