"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ verificationCode, referer }) => ({
    subject: "Welcome to Repartease",
    html: `<p><a href="${referer}?verification=${verificationCode}">Click Here</a> to verify your emailaddress!</p>`,
});
