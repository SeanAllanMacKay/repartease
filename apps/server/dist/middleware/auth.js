"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
exports.auth = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: "{yourApiIdentifier}",
    issuerBaseURL: `https://{yourDomain}/`,
});
