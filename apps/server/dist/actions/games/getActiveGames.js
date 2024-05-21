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
exports.getActiveGames = void 0;
const Game_1 = require("../../database/schemas/Game");
const getActiveGames = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page, pageSize, playerId, }) {
    const games = yield Game_1.Game.find({
        $and: [{ players: { $elemMatch: { playerId } } }],
    }, {
        gameCode: 1,
        gameType: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
        players: 1,
        owner: 1,
        _id: 1,
        rounds: 1,
    })
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    return {
        games: games !== null && games !== void 0 ? games : [],
        status: 200,
        message: "Games fetched.",
    };
});
exports.getActiveGames = getActiveGames;
