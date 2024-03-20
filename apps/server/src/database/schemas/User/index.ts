import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import database from "../../";

import type { UserDocument, UserModel } from "./types";

const { Schema } = mongoose;

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: true },
    games: [Schema.Types.ObjectId],
  },
  { collection: "Users" }
);

database.model("User", userSchema);

export * from "./types";

export const User = database.model<UserDocument, UserModel>("User");
