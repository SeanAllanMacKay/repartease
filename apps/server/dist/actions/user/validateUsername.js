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
exports.validateUsername = void 0;
const schemas_1 = require("../../database/schemas");
const validateUsername = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, username, }) {
    try {
        let user = yield schemas_1.User.findOne(Object.assign({ username }, (userId ? { _id: { $ne: userId } } : {})));
        if (user) {
            throw {
                status: 409,
                error: "That one's taken, try being a bit more original.",
            };
        }
        return { status: 200, message: "Username available" };
    }
    catch (caught) {
        const { status = 500, error = "There was an error validating this username.", } = caught;
        console.log(caught);
        throw {
            status: status,
            error: error,
        };
    }
});
exports.validateUsername = validateUsername;
