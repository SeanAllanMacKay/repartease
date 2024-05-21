"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusher = void 0;
const pusher_1 = __importDefault(require("pusher"));
// shared env variables
const PUSHER_KEY = process.env["PUSHER_KEY"] || "";
const PUSHER_CLUSTER = process.env["PUSHER_CLUSTER"] || "";
// backend env variables
const PUSHER_APP_ID = process.env["PUSHER_APP_ID"] || "";
const PUSHER_SECRET = process.env["PUSHER_SECRET"] || "";
exports.pusher = new pusher_1.default({
    appId: PUSHER_APP_ID,
    key: PUSHER_KEY,
    secret: PUSHER_SECRET,
    cluster: PUSHER_CLUSTER,
});
