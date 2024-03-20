import { Router, Request } from "express";

import { verifyToken } from "@services/auth";

import { addPlayer, leaveGame } from "@actions/games";

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(verifyToken, async (req: Request<{ gameCode: string }>, res) => {
    try {
      const { gameCode } = req.params;
      const { playerName } = req.body;

      const { user, pusher } = req;

      const { status, message, game } = await addPlayer({
        gameCode,
        playerId: user._id,
        playerName,
      });

      pusher.trigger(gameCode, "add-player", {
        playerId: user._id,
        playerName,
      });

      res.status(status).send({ message, game });
    } catch (caught) {
      const {
        error = "There was an error adding a player to this game",
        status = 500,
      } = caught;

      res.status(status).send({ error });
    }
  })
  .delete(verifyToken, async (req: Request<{ gameCode: string }>, res) => {
    try {
      const { gameCode } = req.params;

      const { user, pusher } = req;

      const { status, message } = await leaveGame({
        gameCode,
        playerId: user._id,
      });

      pusher.trigger(gameCode, "remove-player", {
        playerId: user._id,
      });

      res.status(status).send({ message });
    } catch (caught) {
      const { error = "There was an error leaving this game", status = 500 } =
        caught;

      console.log(caught);

      res.status(status).send({ error });
    }
  });

export default router;
