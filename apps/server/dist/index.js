"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const routers_1 = __importDefault(require("./routers"));
const sockets_1 = require("./services/sockets");
// env variables
const NGROK_DOMAIN = process.env["NGROK_DOMAIN"] || "";
// Create server
const app = (0, express_1.default)();
const server = new http_1.Server(app);
// On unhandled errors, log rather than crash
process.on("uncaughtException", function (err) {
    console.error(err);
});
// Required to allow requests from frontend
app.use((0, cors_1.default)({
    origin: [NGROK_DOMAIN, "https://www.repartease.com"],
    credentials: true,
}));
// Required to allow storing cookies
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
// Required to read body objects
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Extends req objects to include access to socket events
app.use((req, _res, next) => {
    req.pusher = sockets_1.pusher;
    next();
});
// Connect to DB
database_1.database
    .on("error", (error) => {
    console.error(error);
})
    .once("open", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Database connected");
    // Start server
    server.listen(process.env.API_PORT || 80, () => {
        console.log(`Server online: connected to port ${process.env.API_PORT || 80}`);
        app.use("/", routers_1.default);
    });
}));
