import { Router, Request } from "express";

import { verifyToken } from "@services/auth";

import { submitResponse } from "@actions/games";

const router = Router({ mergeParams: true });

router.route("/").post(verifyToken, async (req: Request<{gameCode: string;}>, res) => {
  try {
    const { gameCode } = req.params;

    const { io, user } = req;

    const { response } = req.body;

    const { status, message } = await submitResponse({
      gameCode,
      playerId: user._id,
      response,
    });

    io.to(gameCode).emit("update-game");

    res.status(status).send({ message });
  } catch (caught) {
    const {
      error = "There was an error submitting this response",
      status = 500,
    } = caught;

    res.status(status).send({ error });
  }
});

export default router;
