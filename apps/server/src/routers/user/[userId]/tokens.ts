import { Router } from "express";

import { updateUser, deleteUser } from "@actions/user";

const router = Router({ mergeParams: true });

router.route("/").post(verifyToken, async (req, res) => {
  try {
    const {
      user,
      body: { email },
    } = req;

    const {
      status,
      message,
      user: updatedUser,
    } = await updateUser({ email, userId: user._id });

    return res.status(status).send({ message, user: updatedUser });
  } catch (caught) {
    const { status = 500, error = "Something went wrong" } = caught;

    return res.status(status).send({ error });
  }
});

export default router;
