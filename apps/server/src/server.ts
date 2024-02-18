import express from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import database, { User } from "./database";

import routers from "./routers";

import { leaveGame, addPlayer } from "@actions/games";

import { Server as HTTPServer } from "http";

import { Server as SocketServer } from "socket.io";

declare global {
  namespace Express {
    interface Request {
      io?: typeof socket;
      user?: any;
    }
  }
}

const app = express();

const server = new HTTPServer(app);

const socket = new SocketServer(server);

process.on("uncaughtException", function (err) {
  console.error(err);
});

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, _res, next) => {
  req.io = socket;

  next();
});

const socketsInGames = [];

database
  .on("error", (error: any) => {
    console.error(error);
  })
  .once("open", async () => {
    console.log("Database connected");

    socket.on("connection", async (socketConnection) => {
      console.log("Socket connected");

      const rejoinedUser = socketsInGames.find(
        (socket) => socket.userId === socketConnection.handshake.query.userId
      );

      if (rejoinedUser) {
        rejoinedUser.socketId = socketConnection.id;
      } else {
        socketsInGames.push({
          userId: socketConnection.handshake.query.userId,
          socketId: socketConnection.id,
        });
      }

      socketConnection.on("join-room", ({ gameCode, userId } = {}) => {
        addPlayer({ gameCode, playerId: userId });

        socketConnection.join(gameCode);

        const userSocket = socketsInGames.find(
          (socket) => socket.userId === userId
        );

        if (userSocket && userSocket?.gameCode !== gameCode) {
          userSocket.gameCode = gameCode;
        }
      });

      socketConnection.on("leave-room", ({ gameCode, userId } = {}) => {
        socketConnection.leave(gameCode);

        const userSocket = socketsInGames.find(
          (socket) => socket.userId === userId
        );

        if (userSocket && userSocket?.gameCode) {
          userSocket.gameCode = undefined;
        }
      });

      socketConnection.on("disconnect", () => {
        console.log("Socket disconnected");

        const userSocket = socketsInGames.find(
          (socket) => socket.socketId === socketConnection.id
        );

        socketConnection.to(userSocket?.gameCode).emit("update-game");

        setTimeout(() => {
          const userSocket = socketsInGames.find(
            (socket) => socket.socketId === socketConnection.id
          );

          if (userSocket?.gameCode) {
            leaveGame({
              gameCode: userSocket.gameCode,
              playerId: userSocket.userId,
            }).catch(() => {});
          }

          if (!userSocket?.socketId) {
            socketsInGames.splice(
              socketsInGames.findIndex(
                (socket) => socket.socketId === socketConnection.id
              ),
              1
            );
          }
        }, 5000);
      });
    });

    server.listen(process.env.API_PORT, () => {
      console.log(`Server online: connected to port ${process.env.API_PORT}`);

      app.use("/", routers);
    });
  });
