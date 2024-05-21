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
exports.addPlayer = void 0;
const Game_1 = require("../../database/schemas/Game");
const addPlayer = (_a) => __awaiter(void 0, [_a], void 0, function* ({ playerId, playerName, gameCode, }) {
    const game = yield Game_1.Game.findOne({
        gameCode,
    });
    if (!game) {
        throw { error: "There was an error finding this game.", status: 404 };
    }
    const alreadyAdded = game.players.find(({ playerId: currentId }) => currentId === playerId.toString());
    if (alreadyAdded) {
        if (playerName) {
            alreadyAdded.playerName = playerName;
        }
        alreadyAdded.status = "active";
    }
    else {
        game.players.push({
            playerId,
            playerName,
            points: 0,
            status: "active",
            order: game.players.length,
        });
    }
    if (!game.rounds[game.rounds.length - 1].activePlayer) {
        game.rounds[game.rounds.length - 1].activePlayer = playerId;
    }
    yield game.save();
    return { game, status: 200, message: "Player added." };
});
exports.addPlayer = addPlayer;
