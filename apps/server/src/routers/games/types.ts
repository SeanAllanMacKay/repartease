import { Router } from "express";

import { verifyToken } from "@services/auth";

import { getGameTypes } from "@actions/games/getGameTypes";

const router = Router({ mergeParams: true });

router.route("/").get(verifyToken, async (_req, res) => {
  const gameTypes = await getGameTypes();

  res.status(200).send({ message: "Games fetched", gameTypes });
});

export default router;
