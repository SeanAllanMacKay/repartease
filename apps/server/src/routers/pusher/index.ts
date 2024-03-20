import { Router } from "express";

import authRouter from "./auth";
import presenceRouter from "./presence";

const router = Router({ mergeParams: true });

router.use("/auth", authRouter);
router.use("/presence", presenceRouter);

export default router;
