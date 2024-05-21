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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const accountCreated_1 = __importDefault(require("./accountCreated"));
const attemptedSignUp_1 = __importDefault(require("./attemptedSignUp"));
const accountVerified_1 = __importDefault(require("./accountVerified"));
const SENDGRID_API_KEY = process.env["SENDGRID_API_KEY"] || "";
const SENDGRID_EMAIL_ADDRESS = process.env["SENDGRID_EMAIL_ADDRESS"] || "";
mail_1.default.setApiKey(SENDGRID_API_KEY);
const emailTypes = {
    attemptedSignUp: attemptedSignUp_1.default,
    accountCreated: accountCreated_1.default,
    accountVerified: accountVerified_1.default,
};
exports.default = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { email: emailAddress, type } = _a, rest = __rest(_a, ["email", "type"]);
    try {
        const email = Object.assign({ from: SENDGRID_EMAIL_ADDRESS, to: emailAddress }, emailTypes[type](rest));
        try {
            yield mail_1.default.send(email);
            return { email };
        }
        catch (emailError) {
            console.error(emailError);
            throw { email };
        }
    }
    catch (caught) { }
});
