import { Router } from "express";

const router = Router({ mergeParams: true });

router.route("/").post(async (_req, res) => {
  try {
    res.clearCookie("auth");

    res.status(200).send({ message: "Logged out" });
  } catch (caught) {
    const { status = 500, error = "Something went wrong" } = caught;

    res.status(status).send({ error });
  }
});

export default router;
