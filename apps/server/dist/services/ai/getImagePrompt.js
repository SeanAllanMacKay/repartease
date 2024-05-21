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
exports.getImagePrompt = void 0;
const _1 = require(".");
const imageAdjectives = [..._1.commonAdjectives, "ridiculous", "wacky", "absurd"];
const excludedWords = [
    "clown",
    "banana",
    "unicycle",
    "tightrope",
    "tricycle",
    "tutu",
    "scooter",
    "segway",
    "top hat",
    "umbrella",
    "cowboy hat",
    "roller skates",
];
const getImagePrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const adjective = imageAdjectives[Math.floor(Math.random() * imageAdjectives.length)];
    const textPrompt = `Describe a ${adjective} image in one sentence that would make people laugh but don't use any of the following words: ${excludedWords.reduce((total, current, index) => `${total}${!index ? "" : ","} ${index === excludedWords.length - 1 ? "or " : " "}${current}`, "")}. Don't use an animal.`;
    const completion = yield _1.openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [{ role: "system", content: textPrompt }],
        max_tokens: 25,
        temperature: 1.5,
    });
    let gamePrompt = (_d = (_c = (_b = (_a = completion === null || completion === void 0 ? void 0 : completion.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.replace(/^\s+|\s+$/gm, "");
    const image = yield _1.openai.images.generate({
        prompt: `In a hyper-realistic digital art style, show me this scene: "${gamePrompt}"` ||
            "",
        n: 1,
        size: "256x256",
    });
    return (_f = (_e = image === null || image === void 0 ? void 0 : image.data) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.url;
});
exports.getImagePrompt = getImagePrompt;
