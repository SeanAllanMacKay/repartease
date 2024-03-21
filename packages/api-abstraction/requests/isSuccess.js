"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuccess = void 0;
const isSuccess = (status) => /^(2).*$/.test(status.toString());
exports.isSuccess = isSuccess;
