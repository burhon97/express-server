import { Request, Response } from "express";
import { blacklist } from "../setup.js";

export async function logout(request: Request, response: Response) {
  try {
    const header = request.header("authorization");
    const token = header && header.split(" ")[1];

    if (!token) {
      return response.status(403).send({ error: "Failed to logged out." });
    }

    blacklist.add(token);
    response.status(200).send({ success: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    response.status(404).send({ error: "Failed to logged out." });
  }
}
