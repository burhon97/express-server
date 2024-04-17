import { FileRepository } from "../repository/index.js";
import { Request, Response } from "express";
import { rootDirFiles } from "./utils.js";
import path from "path";

export async function fileGet(request: Request, response: Response) {
  const id = request.params.id;

  try {
    const file = await FileRepository.findOneBy({ fileId: id });
    if (!file) {
      response.status(404).send({ file: `Not found file with id [${id}]` });
    }

    response.status(200).sendFile(path.join(rootDirFiles, `/${id}`));
  } catch (error) {
    console.error(error);
    response.status(403).send({ error: `Failed to get file with id [${id}]` });
  }
}
