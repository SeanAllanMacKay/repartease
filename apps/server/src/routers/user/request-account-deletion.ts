import { Router } from "express";

import { requestAccountDeletion } from "@actions/user";

const router = Router({ mergeParams: true });

router.route("/").post(async (req, res) => {
  try {
    const {
      body: { email, reason },
    } = req;

    const { status, message, user } = await requestAccountDeletion({
      email,
      reason,
    });

    return res.status(status).send({ message: message, user });
  } catch (caught) {
    const { status = 500, error = "Something went wrong" } = caught;

    res.status(status).send({ error });
  }
});

export default router;
