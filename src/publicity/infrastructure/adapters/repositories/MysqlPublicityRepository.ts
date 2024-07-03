import { PublicityRepository } from "../../../domain/ports/PublicityRepository";
import { Publicity } from "../../../domain/Publicity";
import { query } from "../../databases/MySql";

export class MysqlPublicityRepository implements PublicityRepository {
  async getAll(): Promise<Publicity[]> {
    const sql = "SELECT * FROM publicity";
    const rows = (await query(sql, [])) as any[]; // Ajuste de tipo aquí

    return rows.map(
      (row: any) =>
        new Publicity(row.id, row.description, row.image, row.image_s3)
    );
  }

  async getById(id: string): Promise<Publicity | null> {
    const sql = "SELECT * FROM publicity WHERE id = ?";
    const params = [id];
    const [rows]: any[] = await query(sql, params);

    if (!rows) {
      return null;
    }

    const row = rows[0];
    return new Publicity(row.id, row.description, row.image, row.image_s3);
  }

  async createPublicity(publicity: Publicity): Promise<Publicity> {
    const sql =
      "INSERT INTO publicity (description, image, image_s3) VALUES (?, ?, ?)";
    const params = [publicity.description, publicity.image, publicity.image_s3];
    const result: any = await query(sql, params);

    return new Publicity(
      result.insertId,
      publicity.description,
      publicity.image,
      publicity.image_s3
    );
  }

  async updatePublicity(
    id: string,
    publicity: Partial<Publicity>
  ): Promise<Publicity | null> {
    const sql = `UPDATE publications SET 
                    description = COALESCE(?, description), 
                    image = COALESCE(?, image), 
                    image_s3 = COALESCE(?, image_s3) 
                    WHERE id = ?`;
    const params = [
      publicity.description,
      publicity.image,
      publicity.image_s3,
      id,
    ];
    const result: any = await query(sql, params);

    if (result.affectedRows === 0) {
      return null;
    }

    return await this.getById(id);
  }

  async deletePublicity(id: string): Promise<boolean> {
    const sql = "DELETE FROM publicity WHERE id = ?";
    const params = [id];
    const result: any = await query(sql, params);

    return result.affectedRows > 0;
  }
}
