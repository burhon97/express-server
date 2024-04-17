import { FileRepository } from "../repository/index.js";
import { Request, Response } from "express";

export async function fileList(request: Request, response: Response) {
  try {
    const files = await FileRepository.find({ take: 10 });
    const loadedFiles = files.length ? files : [];

    response.status(200).send(loadedFiles);
  } catch (error) {
    console.error(error);
    response.status(404).send({ error: "No any files in server." });
  }
}
