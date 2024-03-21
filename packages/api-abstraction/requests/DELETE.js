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
exports.DELETE = void 0;
const __1 = require("..");
const _1 = require("./");
const DELETE = (_a) => __awaiter(void 0, [_a], void 0, function* ({ endpoint, }) {
    var _b;
    try {
        const response = yield fetch(`${(_b = __1.config === null || __1.config === void 0 ? void 0 : __1.config.host) !== null && _b !== void 0 ? _b : ""}/api${endpoint}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if ((0, _1.isSuccess)(response.status)) {
            return yield response.json();
        }
        else {
            throw { response };
        }
    }
    catch (error) {
        const { response } = error;
        const { errorMessage } = yield response.json();
        throw errorMessage;
    }
});
exports.DELETE = DELETE;
