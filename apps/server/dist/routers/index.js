"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const games_1 = __importDefault(require("./games"));
const pusher_1 = __importDefault(require("./pusher"));
const router = (0, express_1.Router)({ mergeParams: true });
router.use("/user", user_1.default);
router.use("/games", games_1.default);
router.use("/pusher", pusher_1.default);
exports.default = router;
