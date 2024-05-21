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
exports.deleteUser = void 0;
const schemas_1 = require("../../database/schemas");
const deleteUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId }) {
    try {
        yield schemas_1.User.findOneAndRemove({ _id: userId });
        return { status: 200, message: "User deleted" };
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
exports.deleteUser = deleteUser;
