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
const express_1 = require("express");
const user_1 = require("../../actions/user");
const router = (0, express_1.Router)({ mergeParams: true });
router.route("/").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: { userId, username }, } = req;
        const { status, message } = yield (0, user_1.validateUsername)({ username, userId });
        return res.status(status).send({ message });
    }
    catch (caught) {
        const { status = 500, error = "Something went wrong" } = caught;
        return res.status(status).send({ error });
    }
}));
exports.default = router;
