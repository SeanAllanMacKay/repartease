import { Router } from "express";

import userRouter from "./user";
import gamesRouter from "./games";
import pusherRouter from "./pusher";

const router = Router({ mergeParams: true });

router.use("/user", userRouter);
router.use("/games", gamesRouter);
router.use("/pusher", pusherRouter);

export default router;
