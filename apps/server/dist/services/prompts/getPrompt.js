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
exports.getPrompt = void 0;
const ai_1 = require("../ai");
const getReparteasePrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, ai_1.getTextPrompt)();
});
const getPicAndItDidntHappenPrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, ai_1.getImagePrompt)();
});
const promptTypeFunctionMapping = {
    Repartease: getReparteasePrompt,
    "Pic And It Didn't Happen": getPicAndItDidntHappenPrompt,
};
const getPrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield getReparteasePrompt();
});
exports.getPrompt = getPrompt;
