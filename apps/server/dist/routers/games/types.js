"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../services/auth");
const getGameTypes_1 = require("../../actions/games/getGameTypes");
const router = (0, express_1.Router)({ mergeParams: true });
router.route("/").get(auth_1.verifyToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameTypes = yield (0, getGameTypes_1.getGameTypes)();
    res.status(200).send({ message: "Games fetched", gameTypes });
}));
exports.default = router;
