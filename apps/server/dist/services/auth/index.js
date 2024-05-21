"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.MAX_AGE = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_PASSPHRASE = process.env["JWT_PASSPHRASE"] || "";
exports.MAX_AGE = 86400;
exports.auth = {
    sign: (payload) => {
        return jsonwebtoken_1.default.sign(payload, JWT_PASSPHRASE, { expiresIn: exports.MAX_AGE });
    },
    verify: (token) => {
        try {
            return jsonwebtoken_1.default.verify(token, JWT_PASSPHRASE);
        }
        catch (err) {
            return false;
        }
    },
    decode: (token) => {
        return jsonwebtoken_1.default.decode(token);
    },
};
__exportStar(require("./verify-token"), exports);
