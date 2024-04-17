import { UserRepository } from "../repository/index.js";
import { UserType } from "../types/index.js";
import { Request, Response } from "express";
import { Config } from "../config.js";
import jwt from "jsonwebtoken";

export async function signIn(request: Request, response: Response) {
  const { username, password } = request.body as UserType;

  try {
    const user = await UserRepository.findOneBy({ username: username });

    if (user && user.password === password) {
      const token = jwt.sign(
        { username: username, password: password },
        Config.jwtSecret,
        { expiresIn: "10m", algorithm: "HS512" }
      );

      response.status(200).send({ token: token });
    }
  } catch (error) {
    console.error(error);
    response
      .status(403)
      .send({ error: `Didn't found any user with username [${username}]` });
  }
}
