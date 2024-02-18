import { Router } from "express";

import userRouter from "./user";
import gamesRouter from "./games";

const router = Router({ mergeParams: true });

router.use("/user", userRouter);
router.use("/games", gamesRouter);

export default router;
