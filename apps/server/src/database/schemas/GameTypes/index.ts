import mongoose from "mongoose";

import { database } from "../../";

import type { GameTypeDocument, GameTypeModel } from "./types";

const { Schema } = mongoose;

const gameTypeSchema = new Schema<GameTypeDocument>(
  {
    name: { type: String, required: true, unique: true },
    cost: { type: Number, required: true },
  },
  { collection: "GameTypes" }
);

database.model("GameType", gameTypeSchema);

export * from "./types";

export const GameType = database.model<GameTypeDocument, GameTypeModel>(
  "GameType"
);
