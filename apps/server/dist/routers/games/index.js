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
const auth_1 = require("../../services/auth");
const games_1 = require("../../actions/games");
const types_1 = __importDefault(require("./types"));
const _gameCode_1 = __importDefault(require("./[gameCode]"));
const router = (0, express_1.Router)({ mergeParams: true });
router
    .route("/")
    .get(auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const { page = 1, pageSize = 20 } = req.query;
        if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
            throw {
                error: "Incorrect page or pageSize formatting",
                status: 400,
            };
        }
        const { games, status, message } = yield (0, games_1.getActiveGames)({
            page: Number(page),
            pageSize: Number(pageSize),
            playerId: user._id,
        });
        res.status(status).send({ message, games });
    }
    catch (caught) {
        const { error = "There was an error fetching your active games", status = 500, } = caught;
        console.log(caught);
        res.status(status).send({ error });
    }
}))
    .post(auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerName } = req.body;
        const { user } = req;
        const { status, message, game } = yield (0, games_1.createGame)({
            playerName,
            playerId: user._id,
        });
        res.status(status).send({ message, game });
    }
    catch (caught) {
        console.log(caught);
        const { error = "There was an error creating this game", status = 500 } = caught;
        res.status(status).send({ error });
    }
}));
router.use("/types", types_1.default);
router.use("/:gameCode", _gameCode_1.default);
exports.default = router;
