import { Router } from "express";

import { createGame, getActiveGames } from "@actions/games";

import gameTypesRouter from "./types";
import gamesRouter from "./[gameCode]";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const { user } = req;

      const { games, status, message } = await getActiveGames({
        playerId: user._id,
      });

      res.status(status).send({ message, games });
    } catch (caught) {
      const {
        error = "There was an error fetching your active games",
        status = 500,
      } = caught;

      res.status(status).send({ error });
    }
  })
  .post(async (req, res) => {
    try {
      const { playerName } = req.body;

      const { user } = req;

      const { status, message, game } = await createGame({
        playerName,
        playerId: user._id,
      });

      res.status(status).send({ message, game });
    } catch (caught) {
      const { error = "There was an error creating this game", status = 500 } =
        caught;

      res.status(status).send({ error });
    }
  });

router.use("/types", gameTypesRouter);
router.use("/:gameCode", gamesRouter);

export default router;
