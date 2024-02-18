import { Router } from "express";

import { login } from "@actions/user";

import { auth, MAX_AGE } from "@services/auth";

const router = Router({ mergeParams: true });

router.route("/").post(async (req, res) => {
  try {
    const {
      body: { username, password },
    } = req;

    const { status, message, user } = await login({
      username,
      password,
    });

    const token = await auth.sign({ _id: user._id });

    res.cookie("auth", token, {
      httpOnly: true,
      maxAge: MAX_AGE * 1000, // 3hrs in ms
    });

    res.status(status).send({ message: message, user });
  } catch (caught) {
    const { status = 500, error = "Something went wrong" } = caught;

    res.status(status).send({ error });
  }
});

export default router;
