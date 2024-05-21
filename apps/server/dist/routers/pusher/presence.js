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
const games_1 = require("../../actions/games");
const router = (0, express_1.Router)({ mergeParams: true });
router.route("/").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: { events }, } = req;
        events.forEach(({ channel, name, user_id }) => {
            const gameCode = channel.replace("presence-", "");
            switch (name) {
                case "member_added":
                    (0, games_1.addPlayer)({ gameCode, playerId: user_id });
                    break;
                case "member_removed":
                    (0, games_1.setPlayerAway)({ gameCode, playerId: user_id });
                    break;
            }
        });
        return res.sendStatus(200);
    }
    catch (caught) {
        const { status = 500, error = "Something went wrong" } = caught;
        res.status(status).send({ error });
    }
}));
exports.default = router;
