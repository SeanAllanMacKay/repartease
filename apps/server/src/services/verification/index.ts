import { default as twilio } from "twilio";

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../../", `.env.${process.env.NODE_ENV}`),
});

const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

export const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

export * from "./sendVerification";
export * from "./verifyAccount";
