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
exports.verifyAccount = void 0;
const verifySid = process.env.TWILIO_VID;
const _1 = require(".");
const verifyAccount = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, verificationCode, }) {
    try {
        return yield _1.client.verify.v2
            .services(verifySid)
            .verificationChecks.create({ to, code: verificationCode });
    }
    catch (caught) {
        console.error(caught);
        throw caught;
    }
});
exports.verifyAccount = verifyAccount;
