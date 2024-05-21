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
const auth_1 = require("../../services/auth");
const router = (0, express_1.Router)({ mergeParams: true });
router.route("/").post(auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: { socket_id, channel_name }, user, pusher, } = req;
        if (user) {
            const presenceData = {
                user_id: user === null || user === void 0 ? void 0 : user._id,
            };
            return res.send(pusher.authorizeChannel(socket_id, channel_name, presenceData));
        }
        throw { status: 403 };
    }
    catch (caught) {
        const { status = 500, error = "Something went wrong" } = caught;
        res.status(status).send({ error });
    }
}));
exports.default = router;
