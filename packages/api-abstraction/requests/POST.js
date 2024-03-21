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
exports.POST = void 0;
const __1 = require("..");
const _1 = require("./");
const POST = (_a) => __awaiter(void 0, [_a], void 0, function* ({ endpoint, body, }) {
    var _b, _c;
    try {
        const response = yield fetch(`${(_b = __1.config === null || __1.config === void 0 ? void 0 : __1.config.host) !== null && _b !== void 0 ? _b : ""}/api${endpoint}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if ((0, _1.isSuccess)(response.status)) {
            return yield response.json();
        }
        else {
            throw { response };
        }
    }
    catch (caught) {
        const { response } = caught;
        if (response === null || response === void 0 ? void 0 : response.json) {
            throw yield ((_c = response === null || response === void 0 ? void 0 : response.json) === null || _c === void 0 ? void 0 : _c.call(response));
        }
        throw caught;
    }
});
exports.POST = POST;
