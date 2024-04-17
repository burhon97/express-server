import { NextFunction, Request, Response } from "express";
import { blacklist } from "../setup.js";
import { Config } from "../config.js";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    res.status(401);
    return res.send({ status: "Not authorized." });
  }

  if (blacklist.has(token)) {
    return res.status(401).json({ message: "Token is revoked" });
  }

  try {
    jwt.verify(token, Config.jwtSecret);
    next();
  } catch (err) {
    res.status(401);
    res.json({ status: "Invalid token" });
  }
}
