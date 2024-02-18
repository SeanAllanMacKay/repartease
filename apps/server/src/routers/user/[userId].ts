import { Router } from "express";

import { updateUser, deleteUser } from "@actions/user";

import { verifyToken } from "@services/auth";

const router = Router({ mergeParams: true });

router
  .route("/")
  .put(verifyToken, async (req, res) => {
    try {
      const {
        user,
        body: { username },
      } = req;

      const {
        status,
        message,
        user: updatedUser,
      } = await updateUser({ username, userId: user._id });

      return res.status(status).send({ message, user: updatedUser });
    } catch (caught) {
      const { status = 500, error = "Something went wrong" } = caught;

      return res.status(status).send({ error });
    }
  })
  .delete(verifyToken, async (req, res) => {
    try {
      const { user } = req;

      const { status, message } = await deleteUser({ userId: user._id });

      return res.status(status).send({ message });
    } catch (caught) {
      const { status = 500, error = "Something went wrong" } = caught;

      return res.status(status).send({ error });
    }
  });

export default router;
