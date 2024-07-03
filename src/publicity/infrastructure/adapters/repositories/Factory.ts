import dotenv from "dotenv";

import { PublicityRepository } from "../../../domain/ports/PublicityRepository";
import { MongoPublicityRepository } from "./MongoPublicityRepository";
import { MysqlPublicityRepository } from "./MysqlPublicityRepository";

dotenv.config();

const db_selector = process.env.DB_SELECTOR;

export class Factory {
  static createPublicityRepository(): PublicityRepository {
    if (db_selector === "mysql") {
      console.log("Modo MySQL");
      return new MysqlPublicityRepository();
    } else if (db_selector === "mongo") {
      console.log("Modo Mongo");
      return new MongoPublicityRepository();
    }
    throw new Error("Unsupported database type");
  }
}
