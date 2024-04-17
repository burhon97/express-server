import { FileRepository } from "../repository/index.js";
import { Request, Response } from "express";
import { rootDirFiles } from "./utils.js";
import path from "path";

export async function fileDownload(request: Request, response: Response) {
  const id = request.params.id;

  try {
    const file = await FileRepository.findOneBy({ fileId: id });
    if (!file) {
      response.status(404).send({ file: `Not found file with id [${id}]` });
    }

    response.setHeader("Content-Type", `${file?.mimetype}`);

    const filePath = path.join(rootDirFiles, `/${id}`);
    response.status(200).download(filePath);
  } catch (error) {
    console.error(error);
    response.status(403).send({ error: `Failed to get file with id [${id}]` });
  }
}
