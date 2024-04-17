import { UserType } from "../types/index.js";
import { Request, Response } from "express";
import { Config } from "../config.js";
import jwt from "jsonwebtoken";

export function signInNewToken(request: Request, response: Response) {
  const { token } = request.body;

  try {
    const verify = jwt.verify(token, Config.jwtSecret) as UserType & {
      iat: number;
      exp: number;
    };

    if (!verify) {
      response.status(403).send({ error: "Invalid token." });
    }
    const refreshToken = jwt.sign(
      { username: verify.username, password: verify.password },
      Config.jwtSecret,
      {
        expiresIn: "10m",
        algorithm: "HS512",
      }
    );
    response.status(200).send({ refreshToken });
  } catch (error) {
    console.log(error);
    response.status(403).send({ error: "Invalid token." });
  }
}
