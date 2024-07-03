import dotenv from "dotenv";

import { UserRepository } from "../domain/UserRepository";
import { MongoUserRepository } from "./MongoUserRepository";
import { MysqlUserRepository } from "./MysqlUserRepository";

dotenv.config();

const database_selector = process.env.DB_SELECTOR;

export class Factory {
  static creteUserRepository(): UserRepository {
    if (database_selector === "mysql") {
      console.log("Modo MySQL");
      return new MysqlUserRepository();
    } else if (database_selector === "mongo") {
      console.log("Modo Mongo");
      return new MongoUserRepository();
    }
    throw new Error("Unsupported database type");
  }
}
