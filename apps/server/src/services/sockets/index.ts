import Pusher from "pusher";

// shared env variables
const PUSHER_KEY: string = process.env["PUSHER_KEY"] || "";
const PUSHER_CLUSTER: string = process.env["PUSHER_CLUSTER"] || "";

// backend env variables
const PUSHER_APP_ID: string = process.env["PUSHER_APP_ID"] || "";
const PUSHER_SECRET: string = process.env["PUSHER_SECRET"] || "";

export const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
});
