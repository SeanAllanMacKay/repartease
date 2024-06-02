import type { Document, Model } from "mongoose";

export interface UserType {
  _id: string;
  email: string;
  password: string;
  isVerified: boolean;
  games: string[];
  tokens: number;
}

//@ts-ignore
export interface UserDocument extends Document, UserType {}

//@ts-ignore
export interface UserModel extends Model<UserDocument> {}
