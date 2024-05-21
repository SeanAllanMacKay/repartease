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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGame = void 0;
const Game_1 = require("../../database/schemas/Game");
const obfuscate_1 = require("../../utilities/obfuscate");
const getGame = (_a) => __awaiter(void 0, [_a], void 0, function* ({ playerId, gameCode, }) {
    const game = yield Game_1.Game.findOne({
        gameCode,
        players: { $elemMatch: { playerId: playerId.toString() } },
    });
    if (!game) {
        throw { error: "There was an error fetching this game.", status: 404 };
    }
    const { _id, owner, players, status, rounds, createdAt, updatedAt } = game;
    const currentRound = rounds.pop();
    if (currentRound.status === "submission") {
        const obfuscatedAnswers = currentRound.responses.map((_a) => {
            var { response } = _a, rest = __rest(_a, ["response"]);
            return (Object.assign(Object.assign({}, rest), { response: (0, obfuscate_1.obfuscate)(response) }));
        });
        currentRound.responses = obfuscatedAnswers;
    }
    return {
        game: {
            _id,
            owner,
            status,
            rounds: [...rounds, currentRound],
            createdAt,
            updatedAt,
            gameCode,
            players,
        },
        status: 200,
        message: "Game fetched.",
    };
});
exports.getGame = getGame;
