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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const User_1 = require("../../database/schemas/User");
const _1 = require("./");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_b = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a["auth"]) !== null && _b !== void 0 ? _b : req.get("auth");
    if (!token) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    const verifiedToken = (yield _1.auth.verify(token));
    if (!verifiedToken) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    const user = yield User_1.User.findOne({ _id: verifiedToken._id });
    if (!user) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    //@ts-ignore
    req.user = { email: user.email, _id: user._id, games: user.games };
    next();
});
exports.verifyToken = verifyToken;
