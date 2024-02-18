import { Router, Request } from "express";

import { verifyToken } from "@services/auth";

import { closeResponses } from "@actions/games";

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(verifyToken, async (req: Request<{ gameCode: string }>, res) => {
    try {
      const { gameCode } = req.params;

      const { io, user } = req;

      const { status, message } = await closeResponses({
        gameCode,
        playerId: user._id,
      });

      io.to(gameCode).emit("update-game");

      res.status(status).send({ message });
    } catch (caught) {
      const {
        error = "There was an error closing the responses for this round.",
        status = 500,
      } = caught;

      res.status(status).send({ error });
    }
  });

export default router;
