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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const schemas_1 = require("../../database/schemas");
const validators_1 = require("@repartease/validators");
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, }) {
    try {
        if ((0, validators_1.isEmailInvalid)(email)) {
            throw { status: 400, error: "Invalid email" };
        }
        if ((0, validators_1.isPasswordInvalid)(password)) {
            throw { status: 400, error: "Invalid password" };
        }
        const emailTaken = yield schemas_1.User.findOne({ email });
        if (emailTaken) {
            throw { status: 409, error: "Email taken" };
        }
        const salt = yield bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = yield bcryptjs_1.default.hashSync(password, salt);
        const user = yield schemas_1.User.create({
            email,
            password: hashedPassword,
            isVerified: false,
            games: [],
        });
        return { status: 201, message: "User created", user };
    }
    catch (caught) {
        const { status = 500, error = "There was an error creating this user" } = caught;
        console.log(caught);
        throw {
            status: status,
            error: error,
        };
    }
});
exports.createUser = createUser;
