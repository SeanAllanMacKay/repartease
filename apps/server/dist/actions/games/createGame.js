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
exports.createGame = void 0;
const Game_1 = require("../../database/schemas/Game");
const User_1 = require("../../database/schemas/User");
const prompts_1 = require("../../services/prompts");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const characterArray = characters.split("");
const generateGameCode = () => {
    let gameCode = "";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characterArray.length);
        gameCode += characterArray[randomIndex];
    }
    return gameCode;
};
const createGame = (_a) => __awaiter(void 0, [_a], void 0, function* ({ playerName, playerId, }) {
    const user = yield User_1.User.findOne({ _id: playerId });
    if (!user) {
        throw { error: "There was an error creating the game.", status: 500 };
    }
    const players = [
        { order: 1, playerId, playerName, points: 0, status: "active" },
    ];
    const gameCode = generateGameCode();
    const now = new Date();
    const game = yield Game_1.Game.create({
        owner: playerId,
        gameCode,
        players,
        status: "active",
        rounds: [
            {
                prompt: yield (0, prompts_1.getPrompt)(),
                responses: [],
                status: "submission",
                activePlayer: playerId,
            },
        ],
        createdAt: now,
        updatedAt: now,
    });
    if (!game) {
        throw { error: "There was an error creating the game.", status: 500 };
    }
    user.games.push(game._id);
    yield user.save();
    return { game, status: 200, message: "Game created successfully." };
});
exports.createGame = createGame;
