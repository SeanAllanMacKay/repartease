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
const auth_1 = require("../../../services/auth");
const games_1 = require("../../../actions/games");
const router = (0, express_1.Router)({ mergeParams: true });
router
    .route("/")
    .post(auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameCode } = req.params;
        const { playerName } = req.body;
        const { user, pusher } = req;
        const { status, message, game } = yield (0, games_1.addPlayer)({
            gameCode,
            playerId: user._id,
            playerName,
        });
        pusher.trigger(gameCode, "add-player", {
            playerId: user._id,
            playerName,
        });
        res.status(status).send({ message, game });
    }
    catch (caught) {
        const { error = "There was an error adding a player to this game", status = 500, } = caught;
        res.status(status).send({ error });
    }
}))
    .delete(auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameCode } = req.params;
        const { user, pusher } = req;
        const { status, message } = yield (0, games_1.leaveGame)({
            gameCode,
            playerId: user._id,
        });
        pusher.trigger(gameCode, "remove-player", {
            playerId: user._id,
        });
        res.status(status).send({ message });
    }
    catch (caught) {
        const { error = "There was an error leaving this game", status = 500 } = caught;
        console.log(caught);
        res.status(status).send({ error });
    }
}));
exports.default = router;
