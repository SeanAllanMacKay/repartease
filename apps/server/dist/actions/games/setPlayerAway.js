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
exports.setPlayerAway = void 0;
const Game_1 = require("../../database/schemas/Game");
const setPlayerAway = (_a) => __awaiter(void 0, [_a], void 0, function* ({ playerId, gameCode, }) {
    const game = yield Game_1.Game.findOne({
        gameCode,
        "players.playerId": playerId,
    });
    if (!game) {
        throw { error: "There was an error finding this game.", status: 404 };
    }
    const player = game.players.find((player) => player.playerId === playerId.toString());
    player.status = "away";
    yield game.save();
    return { game, status: 200, message: "Player removed." };
});
exports.setPlayerAway = setPlayerAway;
