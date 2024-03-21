"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordInvalid = void 0;
const string_1 = require("./string");
const MIN_PASSWORD_LENGTH = 10;
const isPasswordInvalid = (value) => {
    const errors = [
        (0, string_1.longerThan)(value, MIN_PASSWORD_LENGTH),
        (0, string_1.containsLowercase)(value),
        (0, string_1.containsUppercase)(value),
        (0, string_1.containsNumber)(value),
    ];
    const isValid = errors.every((error) => !error);
    if (!isValid) {
        return errors.reduce((total, error) => {
            if (error) {
                return `${total}${total.length > 0 ? "\n" : ""}• ${error}`;
            }
            return total;
        }, "");
    }
};
exports.isPasswordInvalid = isPasswordInvalid;
