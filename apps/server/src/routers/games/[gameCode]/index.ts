import { Router, Request } from "express";

import { verifyToken } from "@services/auth";

import { getGame } from "@actions/games";

import playersRouter from "./players";
import closeResponsesRouter from "./close-responses";
import selectWinnerRouter from "./select-winner";
import startGameRouter from "./start-game";
import submitResponseRouter from "./submit-response";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(verifyToken, async (req: Request<{ gameCode: string }>, res) => {
    try {
      const { gameCode } = req.params;

      const { user } = req;

      const { status, message, game } = await getGame({
        gameCode,
        playerId: user._id,
      });

      res.status(status).send({ message, game });
    } catch (caught) {
      const { error = "There was an error fetching this game", status = 500 } =
        caught;

      res.status(status).send({ error });
    }
  });

router.use("/players", playersRouter);
router.use("/close-responses", closeResponsesRouter);
router.use("/select-winner", selectWinnerRouter);
router.use("/start-game", startGameRouter);
router.use("/submit-response", submitResponseRouter);

export default router;
