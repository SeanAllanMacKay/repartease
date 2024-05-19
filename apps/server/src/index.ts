import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Server as HTTPServer } from "http";
import cors from "cors";

import { database } from "./database";
import routers from "./routers";
import { pusher } from "@services/sockets";

// env variables
const NGROK_DOMAIN = process.env["NGROK_DOMAIN"] || "";

// Create server
const app = express();
const server = new HTTPServer(app);

// On unhandled errors, log rather than crash
process.on("uncaughtException", function (err) {
  console.error(err);
});

// Required to allow requests from frontend
app.use(
  cors({
    origin: [NGROK_DOMAIN, "https://www.repartease.com"],
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
    server.listen(process.env.API_PORT, () => {
      console.log(`Server online: connected to port ${process.env.API_PORT}`);

      app.use("/", routers);
    });
  });
