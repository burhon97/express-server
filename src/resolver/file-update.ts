import { FileRepository } from "../repository/index.js";
import { FileEntity } from "../entity/index.js";
import { Request, Response } from "express";
import { rootDirFiles } from "./utils.js";
import fs from "fs";

export async function fileUpdate(request: Request, response: Response) {
  const file = request.file;
  const id = request.params.id;

  try {
    if (!file) {
      response.status(403).send({ error: "Failed to save file." });
      throw new Error("File is null.");
    }

    const currentDate = new Date();
    const dayOfMonthUTC = currentDate.getUTCDate();
    const monthUTC = currentDate.getUTCMonth() + 1;
    const yearUTC = currentDate.getUTCFullYear();

    const utcDateString = `${yearUTC}-${monthUTC
      .toString()
      .padStart(2, "0")}-${dayOfMonthUTC.toString().padStart(2, "0")}`;

    const extension = file.mimetype.split("/");

    await FileRepository.createQueryBuilder()
      .update(FileEntity)
      .set({
        fileId: file.filename,
        title: file.originalname,
        extensions: `.${extension[1]}`,
        mimetype: file.mimetype,
        size: file.size,
        dateUpload: utcDateString,
      })
      .where("fileId = :fileId", { fileId: id })
      .execute();

    fs.unlinkSync(`${rootDirFiles}/${id}`);

    response.status(200).send({ success: "Successfully updated file." });
  } catch (error) {
    console.error(error);
    response.status(403).send({ error: "Failed to save file." });
  }
}
