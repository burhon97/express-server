import { FileRepository } from "../repository/index.js";
import { Request, Response } from "express";
import { rootDirFiles } from "./utils.js";
import fs from "fs";

export async function fileDelete(request: Request, response: Response) {
  const id = request.params.id;

  try {
    await FileRepository.delete({ fileId: id });
    fs.unlinkSync(`${rootDirFiles}/${id}`);

    response
      .status(200)
      .send({ success: `Successfully deleted file with id [${id}]` });
  } catch (error) {
    console.error(error);
    response
      .status(403)
      .send({ error: `Failed to delete file with id [${id}]` });
  }
}
