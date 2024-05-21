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
exports.leaveGame = void 0;
const Game_1 = require("../../database/schemas/Game");
const leaveGame = (_a) => __awaiter(void 0, [_a], void 0, function* ({ playerId, gameCode, }) {
    var _b, _c;
    const game = yield Game_1.Game.findOne({
        gameCode,
        "players.playerId": playerId,
    });
    if (!game) {
        throw { error: "There was an error finding this game.", status: 404 };
    }
    const player = game.players.find((player) => player.playerId === playerId.toString());
    player.status = "inactive";
    if (game.players.filter(({ status }) => status === "active").length < 2) {
        game.status = "waiting";
    }
    if (game.rounds[game.rounds.length - 1].activePlayer === playerId) {
        const playerIndex = game.players.indexOf(player);
        const nextPlayer = game.players.reduce((newIndex, { status }, index) => {
            if (index > playerIndex && status !== "inactive") {
                return index;
            }
            return newIndex;
        }, game.players.findIndex((player) => player.status === "active"));
        game.rounds[game.rounds.length - 1].activePlayer =
            (_c = (_b = game === null || game === void 0 ? void 0 : game.players) === null || _b === void 0 ? void 0 : _b[nextPlayer]) === null || _c === void 0 ? void 0 : _c.playerId;
    }
    yield game.save();
    return { game, status: 200, message: "Player removed." };
});
exports.leaveGame = leaveGame;
