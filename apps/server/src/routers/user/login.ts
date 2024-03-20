import { Router } from "express";

import { login } from "@actions/user";

import { auth, MAX_AGE } from "@services/auth";
import { User } from "@database/schemas/User";

const router = Router({ mergeParams: true });

router.route("/").post(async (req, res) => {
  try {
    const reqToken = req.cookies?.["auth"] ?? req.get("auth");

    if (reqToken) {
      const verifiedToken = (await auth.verify(reqToken)) as { _id: string };

      if (!verifiedToken) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const user = await User.findOne(
        { _id: verifiedToken._id },
        { _id: 1, email: 1, games: 1, isVerified: 1 }
      );

      if (!user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      return res.status(201).send({ message: "Persistent login", user });
    } else {
      const {
        body: { email, password },
      } = req;

      const { status, message, user } = await login({
        email,
        password,
      });

      const token = await auth.sign({ _id: user._id });

      res.cookie("auth", token, {
        secure: true,
        sameSite: "none",
        httpOnly: true,
        maxAge: MAX_AGE * 1000, // 3hrs in ms
      });

      return res.status(status).send({ message: message, user });
    }
  } catch (caught) {
    const { status = 500, error = "Something went wrong" } = caught;

    res.status(status).send({ error });
  }
});

export default router;
