"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shorterThan = exports.longerThan = exports.containsNumber = exports.containsLowercase = exports.containsUppercase = void 0;
const UPPERCASE_REGEX = /[A-Z]/;
const containsUppercase = (value) => {
    const isValid = value.match(UPPERCASE_REGEX);
    if (!isValid) {
        return "Must contain an uppercase letter";
    }
};
exports.containsUppercase = containsUppercase;
const LOWERCASE_REGEX = /[a-z]/;
const containsLowercase = (value) => {
    const isValid = value.match(LOWERCASE_REGEX);
    if (!isValid) {
        return "Must contain a lowercase letter";
    }
};
exports.containsLowercase = containsLowercase;
const NUMBER_REGEX = /[0-9]/;
const containsNumber = (value) => {
    const isValid = value.match(NUMBER_REGEX);
    if (!isValid) {
        return "Must contain a number";
    }
};
exports.containsNumber = containsNumber;
const longerThan = (value, length) => {
    const isValid = value.length > length;
    if (!isValid) {
        return `Must be longer than ${length} characters`;
    }
};
exports.longerThan = longerThan;
const shorterThan = (value, length) => {
    const isValid = value.length < length;
    if (!isValid) {
        return `Must be shorter than ${length} characters`;
    }
};
exports.shorterThan = shorterThan;
