export interface FileStorage {
  uploadFile(file: Express.Multer.File): Promise<string>;
  deleteFile(filePath: string): Promise<void>;
}
