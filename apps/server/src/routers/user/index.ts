import { Router } from "express";

import { createUser } from "@actions/user";

import { auth, MAX_AGE, verifyToken } from "@services/auth";

import loginRouter from "./login";
import logoutRouter from "./logout";
import validateUsernameRouter from "./validate-username";
import userIdRouter from "./[userId]";

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(async (req, res) => {
    try {
      const {
        body: { username, password },
      } = req;

      const { status, message, user } = await createUser({
        username,
        password,
      });

      return res.status(status).send({ message: message, user });
    } catch (caught) {
      const { status = 500, error = "Something went wrong" } = caught;

      return res.status(status).send({ error });
    }
  })
  .get(verifyToken, async (req, res) => {
    try {
      const { user } = req;

      return res.status(200).send({ message: "User fetched", user });
    } catch (caught) {
      const { status = 500, error = "Something went wrong" } = caught;

      return res.status(status).send({ error });
    }
  });

router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/validate-username", validateUsernameRouter);
router.use("/:userId", userIdRouter);

export default router;
