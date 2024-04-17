import { FileRepository } from "../repository/index.js";
import { Request, Response } from "express";

export async function fileUpload(request: Request, response: Response) {
  const file = request.file;

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

    await FileRepository.save({
      fileId: file.filename,
      title: file.originalname,
      extensions: `.${extension[1]}`,
      mimetype: file.mimetype,
      size: file.size,
      dateUpload: utcDateString,
    });

    response
      .status(200)
      .send({ success: `Successfully saved file with id [${file.filename}]` });
  } catch (error) {
    console.error(error);
    response.status(403).send({ error: "Failed to save file." });
  }
}
