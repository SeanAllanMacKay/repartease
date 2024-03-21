import mongoose from "mongoose";

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../", `.env.${process.env.NODE_ENV}`),
});

const DB_URL: string = process.env.DB_URL || "";

export const database = mongoose.createConnection(DB_URL, {});

export * from "./schemas";
