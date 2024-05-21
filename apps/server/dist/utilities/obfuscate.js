"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obfuscate = void 0;
const characters = "abcdefghijklmnopqrstuvwxyz";
const obfuscate = (string) => {
    let obfuscatedString = "";
    for (let i = 0; i < string.length; i++) {
        if (string[i] === " ") {
            obfuscatedString += " ";
        }
        else {
            const randomIndex = Math.floor(Math.random() * characters.length);
            obfuscatedString += characters[randomIndex];
        }
    }
    return obfuscatedString;
};
exports.obfuscate = obfuscate;
