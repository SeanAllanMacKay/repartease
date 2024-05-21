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
const express_1 = require("express");
const user_1 = require("../../actions/user");
const auth_1 = require("../../services/auth");
const User_1 = require("../../database/schemas/User");
const router = (0, express_1.Router)({ mergeParams: true });
router.route("/").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const reqToken = (_b = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a["auth"]) !== null && _b !== void 0 ? _b : req.get("auth");
        if (reqToken) {
            const verifiedToken = (yield auth_1.auth.verify(reqToken));
            if (!verifiedToken) {
                return res.status(401).send({ error: "Unauthorized" });
            }
            const user = yield User_1.User.findOne({ _id: verifiedToken._id }, { _id: 1, email: 1, games: 1, isVerified: 1 });
            if (!user) {
                return res.status(401).send({ error: "Unauthorized" });
            }
            return res.status(201).send({ message: "Persistent login", user });
        }
        else {
            const { body: { email, password }, } = req;
            const { status, message, user } = yield (0, user_1.login)({
                email,
                password,
            });
            const token = yield auth_1.auth.sign({ _id: user._id });
            res.cookie("auth", token, {
                secure: true,
                sameSite: "none",
                httpOnly: true,
                maxAge: auth_1.MAX_AGE * 1000, // 3hrs in ms
            });
            return res.status(status).send({ message: message, user });
        }
    }
    catch (caught) {
        const { status = 500, error = "Something went wrong" } = caught;
        res.status(status).send({ error });
    }
}));
exports.default = router;
