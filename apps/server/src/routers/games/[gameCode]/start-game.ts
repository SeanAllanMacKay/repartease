import { Router, Request } from "express";

import { verifyToken } from "@services/auth";

import { startGame } from "@actions/games";

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(verifyToken, async (req: Request<{ gameCode: string }>, res) => {
    try {
      const { gameCode } = req.params;

      const { pusher, user } = req;

      const { status, message } = await startGame({
        gameCode,
        playerId: user._id,
      });

      pusher.trigger(gameCode, "start-game", {});

      res.status(status).send({ message });
    } catch (caught) {
      const { error = "There was an error starting this game", status = 500 } =
        caught;

      console.log(caught);

      res.status(status).send({ error });
    }
  });

export default router;
