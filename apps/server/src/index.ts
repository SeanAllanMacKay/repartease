import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Server as HTTPServer } from "http";
import cors from "cors";
import ngrok from "@ngrok/ngrok";

import { database } from "./database";
import routers from "./routers";
import { pusher } from "@services/sockets";

// env variables
const NODE_ENV = process.env["NODE_ENV"] || "";
const WEB_PORT = process.env["WEB_PORT"] || "";
const NGROK_DOMAIN = process.env["NGROK_DOMAIN"] || "";
const PORT = process.env["PORT"] || 8080;

// Create server
const app = express();
const server = new HTTPServer(app);

// On unhandled errors, log rather than crash
process.on("uncaughtException", function (err) {
  console.error(err);
});

const CORSOrigins =
  NODE_ENV === "development"
    ? [NGROK_DOMAIN, WEB_PORT]
    : [
        "https://www.repartease.com",
        "http://www.repartease.com",
        "https://repartease-frontend-2d421dc5c988.herokuapp.com",
      ];

// Required to allow requests from frontend
app.use(
  cors({
    origin: CORSOrigins,
    credentials: true,
  })
);
// Required to allow storing cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Required to read body objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Extends req objects to include access to socket events
app.use((req, _res, next) => {
  req.pusher = pusher;

  next();
});

// Connect to DB
database
  .on("error", (error: any) => {
    console.error(error);
  })
  .once("open", async () => {
    console.log("Database connected");

    // Start server
    server.listen(PORT, () => {
      console.log(`Server online: connected to port ${PORT}`);

      app.use("/", routers);
    });
  });

if (process.env.ENVIRONMENT === "development") {
  (async () => {
    const listener = await ngrok.forward({
      addr: process.env.PORT,
      authtoken_from_env: true,
      domain: process.env.NGROK_DOMAIN,
    });

    console.log(`NGROK ingress established at: ${listener.url()}`);
  })();
}
