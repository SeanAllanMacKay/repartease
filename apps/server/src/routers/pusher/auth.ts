import { Router } from "express";
import { verifyToken } from "@services/auth";

const router = Router({ mergeParams: true });

router.route("/").post(verifyToken, async (req, res) => {
  try {
    const {
      body: { socket_id, channel_name },
      user,
      pusher,
    } = req;

    if (user) {
      const presenceData = {
        user_id: user?._id,
      };

      return res.send(
        pusher.authorizeChannel(socket_id, channel_name, presenceData)
      );
    }

    throw { status: 403 };
  } catch (caught) {
    const { status = 500, error = "Something went wrong" } = caught;

    res.status(status).send({ error });
  }
});

export default router;
