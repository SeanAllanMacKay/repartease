import { Router, Request } from "express";

import { verifyToken } from "@services/auth";

import { selectWinner } from "@actions/games";

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(verifyToken, async (req: Request<{ gameCode: string }>, res) => {
    try {
      const { gameCode } = req.params;

      const { pusher, user } = req;

      const { playerId } = req.body;

      const { status, message, game } = await selectWinner({
        gameCode,
        playerId: user._id,
        winnerId: playerId,
      });

      pusher.trigger(gameCode, "select-winner", {
        winnerId: playerId,
        newRound: game.rounds[game.rounds.length - 1],
      });

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
