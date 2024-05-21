"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const __1 = require("../../");
const { Schema } = mongoose_1.default;
const gameSchema = new Schema({
    owner: { type: String, required: true },
    gameCode: { type: String, required: true },
    players: [
        {
            order: Number,
            playerId: { type: String, required: true },
            playerName: { type: String, required: true },
            points: Number,
            status: { type: String, required: true },
        },
    ],
    status: { type: String, required: true },
    rounds: [
        {
            prompt: String,
            activePlayer: String,
            responses: [{ response: String, playerId: String, isWinner: Boolean }],
            status: String,
        },
    ],
    createdAt: Date,
    updatedAt: Date,
}, { collection: "Games" });
__1.database.model("Game", gameSchema);
__exportStar(require("./types"), exports);
exports.Game = __1.database.model("Game");
