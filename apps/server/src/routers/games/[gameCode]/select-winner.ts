import { Router, Request } from "express";

import { verifyToken } from "@services/auth";

import { selectWinner } from "@actions/games";

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(verifyToken, async (req: Request<{ gameCode: string }>, res) => {
    try {
      const { gameCode } = req.params;

      const { io, user } = req;

      const { playerId } = req.body;

      const { status, message } = await selectWinner({
        gameCode,
        playerId: user._id,
        winnerId: playerId,
      });

      io.to(gameCode).emit("update-game");

      res.status(status).send({ message });
    } catch (caught) {
      const {
        error = "There was an error selecting a winner for this round.",
        status = 500,
      } = caught;

      console.log(caught);

      res.status(status).send({ error });
    }
  });

export default router;
