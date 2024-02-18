import { Router } from "express";

import { validateUsername } from "@actions/user";

const router = Router({ mergeParams: true });

router.route("/").post(async (req, res) => {
  try {
    const {
      body: { userId, username },
    } = req;

    const { status, message } = await validateUsername({ username, userId });

    return res.status(status).send({ message });
  } catch (caught) {
    const { status = 500, error = "Something went wrong" } = caught;

    return res.status(status).send({ error });
  }
});

export default router;
