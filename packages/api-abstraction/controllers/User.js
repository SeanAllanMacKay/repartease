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
exports.User = void 0;
const requests_1 = require("../requests");
exports.User = {
    login: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* ({ email, password, } = {}) {
        try {
            return yield (0, requests_1.POST)({
                endpoint: "/user/login",
                body: { email, password },
            });
        }
        catch (caught) {
            console.error(caught);
            throw caught;
        }
    }),
    logout: () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, requests_1.POST)({ endpoint: "/user/logout" }); }),
    get: () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, requests_1.GET)({ endpoint: "/user" }); }),
    update: (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, email }) {
        return yield (0, requests_1.PUT)({
            endpoint: `/user/${userId}`,
            body: { email },
        });
    }),
    validateUsername: (_b) => __awaiter(void 0, [_b], void 0, function* ({ username, userId, }) {
        return yield (0, requests_1.POST)({
            endpoint: "/user/validate-username",
            body: { username, userId },
        });
    }),
};
