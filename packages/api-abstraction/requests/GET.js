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
exports.GET = void 0;
const __1 = require("..");
const _1 = require("./");
const GET = (_a) => __awaiter(void 0, [_a], void 0, function* ({ endpoint, type = "application/json", queryParams = {}, }) {
    var _b, _c;
    try {
        const queryParamString = Object.entries(queryParams).reduce((total, [key, value], index) => `${total}${index ? "&" : ""}${key}=${Array.isArray(value) ? value.join(",") : value}`, "?");
        const response = yield fetch(`${(_b = __1.config === null || __1.config === void 0 ? void 0 : __1.config.host) !== null && _b !== void 0 ? _b : ""}/api${endpoint}${queryParamString !== "?" ? queryParamString : ""}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if ((0, _1.isSuccess)(response.status)) {
            if (type === "application/json") {
                return yield (response === null || response === void 0 ? void 0 : response.json());
            }
            else if (type === "image/*") {
                const reader = (_c = response === null || response === void 0 ? void 0 : response.body) === null || _c === void 0 ? void 0 : _c.getReader();
                const blob = yield new Response(new ReadableStream({
                    start(controller) {
                        return pump();
                        function pump() {
                            return reader === null || reader === void 0 ? void 0 : reader.read().then(({ done, value }) => {
                                // When no more data needs to be consumed, close the stream
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                // Enqueue the next data chunk into our target stream
                                controller.enqueue(value);
                                return pump();
                            });
                        }
                    },
                })).blob();
                return blob;
            }
        }
        else {
            throw { response };
        }
    }
    catch (caught) {
        const { response } = caught;
        const { error } = yield (response === null || response === void 0 ? void 0 : response.json());
        throw { status: response.status, error };
    }
});
exports.GET = GET;
