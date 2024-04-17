import { UserRepository } from "../repository/index.js";
import { UserType } from "../types/index.js";
import { Request, Response } from "express";
import { v4 as userId } from "uuid";

export async function signUp(request: Request, response: Response) {
  try {
    const { username, password } = request.body as UserType;

    if (!username && !password) {
      response
        .status(403)
        .send({ error: "Properties [id] and [password] is required." });
      throw new Error(`Properties [id] and [password] is required.`);
    }

    await UserRepository.save({
      userId: userId(),
      username: username,
      password: password,
    });

    response.status(200).send({
      success: `Successfully registered user with username [${username}]`,
    });
  } catch (error: any) {
    console.error(error);
    response
      .status(403)
      .send({ error: `Can not registered user. ${error.message}` });
  }
}
