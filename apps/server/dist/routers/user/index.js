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
const express_1 = require("express");
const user_1 = require("../../actions/user");
const login_1 = __importDefault(require("./login"));
const logout_1 = __importDefault(require("./logout"));
const validate_username_1 = __importDefault(require("./validate-username"));
const _userId_1 = __importDefault(require("./[userId]"));
const router = (0, express_1.Router)({ mergeParams: true });
router
    .route("/")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: { email, password }, } = req;
        const { status, message, user } = yield (0, user_1.createUser)({
            email,
            password,
        });
        return res.status(status).send({ message: message, user });
    }
    catch (caught) {
        const { status = 500, error = "Something went wrong" } = caught;
        return res.status(status).send({ error });
    }
}))
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        return res.status(200).send({ message: "User fetched", user });
    }
    catch (caught) {
        const { status = 500, error = "Something went wrong" } = caught;
        return res.status(status).send({ error });
    }
}));
router.use("/login", login_1.default);
router.use("/logout", logout_1.default);
router.use("/validate-username", validate_username_1.default);
router.use("/:userId", _userId_1.default);
exports.default = router;
