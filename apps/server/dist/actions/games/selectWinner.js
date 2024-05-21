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
exports.selectWinner = void 0;
const Game_1 = require("../../database/schemas/Game");
const prompts_1 = require("../../services/prompts");
const selectWinner = (_a) => __awaiter(void 0, [_a], void 0, function* ({ playerId, winnerId, gameCode, }) {
    var _b, _c;
    const game = yield Game_1.Game.findOne({
        gameCode,
        players: { $elemMatch: { playerId, status: { $ne: "inactive" } } },
    });
    if (!game) {
        throw { error: "There was an error finding this game.", status: 404 };
    }
    const currentRound = game.rounds[game.rounds.length - 1];
    const winningResponse = currentRound.responses.find(({ playerId: currentPlayerId }) => currentPlayerId.toString() === winnerId.toString());
    winningResponse.isWinner = true;
    currentRound.status = "complete";
    const winningPlayer = game.players.find(({ playerId }) => winnerId === playerId.toString());
    winningPlayer.points += 1;
    const playerIndex = game.players.findIndex((player) => player.playerId === playerId.toString());
    let newTurnIndex = 0;
    if (playerIndex !== game.players.length - 1) {
        for (let i = playerIndex + 1; i < game.players.length; i++) {
            if (game.players[i].status !== "inactive") {
                newTurnIndex = i;
                break;
            }
        }
    }
    game.rounds.push({
        prompt: yield (0, prompts_1.getPrompt)(),
        responses: [],
        status: "submission",
        activePlayer: (_c = (_b = game === null || game === void 0 ? void 0 : game.players) === null || _b === void 0 ? void 0 : _b[newTurnIndex]) === null || _c === void 0 ? void 0 : _c.playerId,
    });
    yield game.save();
    return { status: 200, message: "Response submitted.", game };
});
exports.selectWinner = selectWinner;
