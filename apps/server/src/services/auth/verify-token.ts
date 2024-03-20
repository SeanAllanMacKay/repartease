import { User } from "@database/schemas/User";

import { auth } from "./";

import type { RequestHandler } from "express";

export const verifyToken: RequestHandler = async (req, res, next) => {
  const token = req.cookies?.["auth"] ?? req.get("auth");

  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const verifiedToken = (await auth.verify(token)) as { _id: string };

  if (!verifiedToken) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const user = await User.findOne({ _id: verifiedToken._id });

  if (!user) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  //@ts-ignore
  req.user = { email: user.email, _id: user._id, games: user.games };

  next();
};
