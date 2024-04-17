import { EntitySchema } from "typeorm";
import { FileType } from "../types/index.js";

export const FileEntity = new EntitySchema<FileType>({
  name: "FileType",
  tableName: "files",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: "increment",
    },
    fileId: {
      type: "varchar",
    },
    title: {
      type: "varchar",
    },
    extensions: {
      type: "varchar",
    },
    mimetype: {
      type: "varchar",
    },
    size: {
      type: "int",
    },
    dateUpload: {
      type: "varchar",
    },
  },
});
