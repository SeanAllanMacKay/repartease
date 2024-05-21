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
exports.getTextPrompt = void 0;
const _1 = require(".");
const textAdjectives = [..._1.commonAdjectives, "offensive", "rude", "cheeky"];
const getTextPrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const openAIPrompt = `Create a ${textAdjectives[Math.floor(Math.random() * textAdjectives.length)]} Quiplash prompt that isn't a comparison and doesn't use underscores`;
    const completion = yield _1.openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [{ role: "system", content: openAIPrompt }],
        max_tokens: 25,
        temperature: 1,
    });
    let gamePrompt = (_d = (_c = (_b = (_a = completion === null || completion === void 0 ? void 0 : completion.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.replace(/^\s+|\s+$/gm, "");
    // @ts-ignore
    gamePrompt = gamePrompt === null || gamePrompt === void 0 ? void 0 : gamePrompt.replaceAll(`"`, "");
    // @ts-ignore
    gamePrompt = gamePrompt === null || gamePrompt === void 0 ? void 0 : gamePrompt.replaceAll("Q:", "");
    // @ts-ignore
    gamePrompt = gamePrompt === null || gamePrompt === void 0 ? void 0 : gamePrompt.replace(/A:.*/g, "");
    return gamePrompt;
});
exports.getTextPrompt = getTextPrompt;
