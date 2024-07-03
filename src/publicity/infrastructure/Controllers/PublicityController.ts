import { NextFunction, Request, Response } from "express";

import CreatePublicityUserCase from "../../application/CreatePublicityUseCase";
import DeletePublicityUseCase from "../../application/DeletePublicityUseCase";
import GetAllPublicityUseCase from "../../application/GetAllPublicityUseCase";
import GetByIdPublicityUseCase from "../../application/GetByIdPublicityUseCase";
import UpdatePublicityUseCase from "../../application/UpdatePublicityUseCase";
import { LocalFileStorage } from "../adapters/storages/LocalFileStorage";
import { S3FileStorage } from "../adapters/storages/S3FileStorage";

const localFileStorage = new LocalFileStorage();
const s3FileStorage = new S3FileStorage();

class PublicityController {
  constructor(
    private getAllPublicityUseCase: GetAllPublicityUseCase,
    private createPublicityUserCase: CreatePublicityUserCase,
    private getByIdPublicityUseCase: GetByIdPublicityUseCase,
    private updatePublicityUseCase: UpdatePublicityUseCase,
    private deletePublicityUseCase: DeletePublicityUseCase
  ) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> {
    try {
      const publicationPayload = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).send("No file uploaded");
      }

      // Guardar archivo localmente
      const localFilePath = await localFileStorage.uploadFile(file);

      // Subir imagen a S3
      const s3FilePath = await s3FileStorage.uploadFile(file);

      const publicationData = {
        ...publicationPayload,
        image: localFilePath,
        image_s3: s3FilePath,
      };
      const publication = await this.createPublicityUserCase.execute(
        publicationData
      );

      res.status(201).json(publication);
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("Publicacion creada con exito");
      }
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const publications = await this.getAllPublicityUseCase.execute();
      res.json(publications);
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const publication = await this.getByIdPublicityUseCase.run(req.params.id);
      res.json(publication);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> {
    try {
      const publicationId = req.params.id;
      const publicationPayload = req.body;
      const file = req.file;

      // Obtener la publicación existente
      const existingPublication = await this.getByIdPublicityUseCase.run(
        publicationId
      );
      if (!existingPublication) {
        return res.status(404).send("Publication not found");
      }

      // Eliminar imagen antigua si existe una nueva
      if (file) {
        await localFileStorage.deleteFile(existingPublication.image);
        await s3FileStorage.deleteFile(existingPublication.image_s3);

        // Guardar archivo localmente
        const localFilePath = await localFileStorage.uploadFile(file);

        // Subir imagen a S3
        const s3FilePath = await s3FileStorage.uploadFile(file);

        publicationPayload.image = localFilePath;
        publicationPayload.image_s3 = s3FilePath;
      }

      const updatedPublication = await this.updatePublicityUseCase.execute(
        publicationId,
        publicationPayload
      );
      res.json(updatedPublication);
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("Publicacion creada con exito");
      }
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> {
    try {
      const publicationId = req.params.id;

      // Obtener la publicación existente
      const existingPublication = await this.getByIdPublicityUseCase.run(
        publicationId
      );
      if (!existingPublication) {
        return res.status(404).send("Publication not found");
      }

      // Eliminar imagen de S3
      await s3FileStorage.deleteFile(existingPublication.image_s3);

      // Eliminar imagen del almacenamiento local
      await localFileStorage.deleteFile(existingPublication.image);

      const result = await this.deletePublicityUseCase.execute(publicationId);
      res.status(result ? 200 : 404).json({ success: result });
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("Publicacion creada con exito");
      }
    }
  }
}

export default PublicityController;
