import { FileEntity } from "../entity/files.js";
import { AppDataSource } from "../setup.js";

export const FileRepository = AppDataSource.getRepository(FileEntity).extend(
  {}
);
