import type { Document, Model } from "mongoose";

export interface GameTypeType {
  name: string;
  cost: number;
}

//@ts-ignore
export interface GameTypeDocument extends Document, GameTypeType {}

//@ts-ignore
export interface GameTypeModel extends Model<GameTypeDocument> {}
