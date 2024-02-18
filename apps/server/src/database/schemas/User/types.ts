import type { Document, Model } from "mongoose";

export interface UserType {
  _id: string;
  username: string;
  password: string;
  games: string[];
}

//@ts-ignore
export interface UserDocument extends Document, UserType {}

//@ts-ignore
export interface UserModel extends Model<UserDocument> {}
