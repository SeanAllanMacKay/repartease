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
exports.updateUser = void 0;
const schemas_1 = require("../../database/schemas");
const updateUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, email, }) {
    try {
        let user = yield schemas_1.User.findOne({ _id: userId });
        if (!user) {
            throw { status: 404, error: "User not found" };
        }
        if (user.email === email) {
            return {
                status: 304,
                message: "Email not changed",
                user: { email: email, _id: userId, games: user.games },
            };
        }
        const comparison = yield schemas_1.User.findOne({ email });
        if (comparison) {
            throw { status: 409, error: "Email already taken" };
        }
        user.email = email;
        yield user.save();
        return {
            status: 200,
            message: "User updated",
            user: { email: email, _id: userId, games: user.games },
        };
    }
    catch (caught) {
        const { status = 500, error = "There was an error updating this user." } = caught;
        console.log(caught);
        throw {
            status: status,
            error: error,
        };
    }
});
exports.updateUser = updateUser;
