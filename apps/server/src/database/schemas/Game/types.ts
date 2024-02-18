import type { Document, Model } from "mongoose";

export interface GameEntityType {
  owner: string;
  gameCode: string;
  players: {
    order: number;
    playerName: string;
    playerId: string;
    points: number;
    status: "active" | "inactive";
  }[];
  status: "active" | "waiting" | "complete";
  activePlayer: string;
  rounds: {
    prompt: string;
    activePlayer?: string;
    responses: { response: string; playerId: string; isWinner?: boolean }[];
    status: "submission" | "voting" | "complete";
  }[];
  createdAt: Date;
  updatedAt: Date;
}

//@ts-ignore
export interface GameDocument extends Document, GameEntityType {}

//@ts-ignore
export interface GameModel extends Model<GameDocument> {}
