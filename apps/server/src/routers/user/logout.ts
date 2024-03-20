import { Router } from "express";

const router = Router({ mergeParams: true });

router.route("/").post(async (_req, res) => {
  try {
    await res.clearCookie("auth", {
      secure: true,
      sameSite: "none",
      httpOnly: true,
    });

    await res.status(200).send({ message: "Logged out" });
  } catch (caught) {
    const { status = 500, error = "Something went wrong" } = caught;

    res.status(status).send({ error });
  }
});

export default router;
