"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequiredInvalid = void 0;
const isRequiredInvalid = (value) => {
    const isValid = ![null, undefined, ""].includes(value);
    if (!isValid) {
        return "You've got to put something here.";
    }
};
exports.isRequiredInvalid = isRequiredInvalid;
