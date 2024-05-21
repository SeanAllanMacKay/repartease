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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const schemas_1 = require("../../database/schemas");
const createUser_1 = require("./createUser");
const login = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    try {
        let user = yield schemas_1.User.findOne({ email });
        if (!user) {
            user = (yield (0, createUser_1.createUser)({ email, password })).user;
        }
        else {
            const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!passwordMatch) {
                throw null;
            }
        }
        return {
            status: 200,
            message: "Logged in",
            user: { email: user.email, _id: user._id, games: user.games },
        };
    }
    catch (caught) {
        const { status = 500, error = "There was an error logging you into this account", } = caught;
        console.log(caught);
        throw {
            status: status,
            error: error,
        };
    }
});
exports.login = login;
