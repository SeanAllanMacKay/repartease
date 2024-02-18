import mongoose from "mongoose";

import database from "../../";

import type { GameDocument, GameModel } from "./types";

const { Schema } = mongoose;

const gameSchema = new Schema<GameDocument>(
  {
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
    activePlayer: String,
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
  },
  { collection: "Games" },
);

database.model("Game", gameSchema);

export * from "./types";

export const Game = database.model<GameDocument, GameModel>("Game");
