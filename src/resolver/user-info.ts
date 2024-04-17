import { Request, Response } from "express";
import { UserRepository } from "../repository/index.js";
import { UserType } from "../types/index.js";
import { Config } from "../config.js";
import jwt from "jsonwebtoken";

export async function userInfo(request: Request, response: Response) {
  try {
    const header = request.headers["authorization"];
    const token = header && header.split(" ")[1];
    if (!token) {
      response.status(401);
      response.send({ status: "Not authorized." });
      return;
    }

    const decryptedToken = jwt.verify(token, Config.jwtSecret) as UserType;
    const user = await UserRepository.findOneBy({
      username: decryptedToken.username,
    });

    if (!user) {
      response.status(404).send({ error: "User info not found." });
    }
    response.status(200).send({ username: user?.username });
  } catch (error) {
    console.error(error);
    response.status(404).send({ error: "Failed to get info user." });
  }
}
