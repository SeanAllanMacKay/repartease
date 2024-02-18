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

      const { user, io } = req;

      const { status, message, game } = await addPlayer({
        gameCode,
        playerId: user._id,
        playerName,
      });

      io.to(gameCode).emit("update-game");

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

      const { user, io } = req;

      const { status, message } = await leaveGame({
        gameCode,
        playerId: user._id,
      });

      io.to(gameCode).emit("update-game");

      res.status(status).send({ message });
    } catch (caught) {
      const { error = "There was an error leaving this game", status = 500 } =
        caught;

      console.log(caught);

      res.status(status).send({ error });
    }
  });

export default router;
