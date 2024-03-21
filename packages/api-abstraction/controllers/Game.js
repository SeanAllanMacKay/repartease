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
exports.Game = void 0;
const requests_1 = require("../requests");
exports.Game = {
    create: (_a) => __awaiter(void 0, [_a], void 0, function* ({ playerName }) { return yield (0, requests_1.POST)({ endpoint: "/games", body: { playerName } }); }),
    start: (_b) => __awaiter(void 0, [_b], void 0, function* ({ gameCode }) { return yield (0, requests_1.POST)({ endpoint: `/games/${gameCode}/start-game` }); }),
    get: (_c) => __awaiter(void 0, [_c], void 0, function* ({ gameCode }) { return yield (0, requests_1.GET)({ endpoint: `/games/${gameCode}` }); }),
    join: (_d) => __awaiter(void 0, [_d], void 0, function* ({ gameCode, playerName, }) {
        return yield (0, requests_1.POST)({
            endpoint: `/games/${gameCode}/players`,
            body: { playerName },
        });
    }),
    leave: (_e) => __awaiter(void 0, [_e], void 0, function* ({ gameCode }) { return yield (0, requests_1.DELETE)({ endpoint: `/games/${gameCode}/players` }); }),
    pause: (_f) => __awaiter(void 0, [_f], void 0, function* ({ gameCode }) { return yield (0, requests_1.PUT)({ endpoint: `/games/${gameCode}` }); }),
    end: (_g) => __awaiter(void 0, [_g], void 0, function* ({ gameCode }) { return yield (0, requests_1.DELETE)({ endpoint: `/games/${gameCode}` }); }),
    submitResponse: (_h) => __awaiter(void 0, [_h], void 0, function* ({ gameCode, response, }) {
        return yield (0, requests_1.POST)({
            endpoint: `/games/${gameCode}/submit-response`,
            body: { response },
        });
    }),
    closeResponses: (_j) => __awaiter(void 0, [_j], void 0, function* ({ gameCode }) { return yield (0, requests_1.POST)({ endpoint: `/games/${gameCode}/close-responses` }); }),
    submitSelection: (_k) => __awaiter(void 0, [_k], void 0, function* ({ gameCode, playerId, }) {
        return yield (0, requests_1.POST)({
            endpoint: `/games/${gameCode}/select-winner`,
            body: { playerId },
        });
    }),
    getPrevious: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, requests_1.GET)({
            endpoint: `/games`,
        });
    }),
};
