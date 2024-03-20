import { Router } from "express";
import { addPlayer, setPlayerAway } from "@actions/games";

const router = Router({ mergeParams: true });

router.route("/").post(async (req, res) => {
  try {
    const {
      body: { events },
    } = req;

    events.forEach(({ channel, name, user_id }) => {
      const gameCode = channel.replace("presence-", "");

      switch (name) {
        case "member_added":
          addPlayer({ gameCode, playerId: user_id });
          break;
        case "member_removed":
          setPlayerAway({ gameCode, playerId: user_id });
          break;
      }
    });

    return res.sendStatus(200);
  } catch (caught) {
    const { status = 500, error = "Something went wrong" } = caught;

    res.status(status).send({ error });
  }
});

export default router;
