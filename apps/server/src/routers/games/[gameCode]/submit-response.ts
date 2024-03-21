import { Router, Request } from "express";

import { verifyToken } from "@services/auth";

import { submitResponse } from "@actions/games";
import { obfuscate } from "@utilities/obfuscate";

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(verifyToken, async (req: Request<{ gameCode: string }>, res) => {
    try {
      const { gameCode } = req.params;

      const { pusher, user } = req;

      const { response } = req.body;

      const { status, message } = await submitResponse({
        gameCode,
        playerId: user._id,
        response,
      });

      pusher.trigger(gameCode, "submit-response", {
        playerId: user._id,
        response: obfuscate(response),
      });

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
